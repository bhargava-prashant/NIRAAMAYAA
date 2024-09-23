const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); 
const Appointment = require('./models/appointment');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
router.use(cors());

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

router.post('/signup', async (req, res) => {
    const {
        fullName, dateOfBirth, phoneNo, address, gender, role,
        email, password, adminUniqueId, experience, specialization, doctorIdNo
    } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const newUser = new User({
            fullName, dateOfBirth, phoneNo, address, gender, role, email, password
        });

        if (role === 'Admin') newUser.adminUniqueId = adminUniqueId;
        if (role === 'Doctor') {
            newUser.experience = experience;
            newUser.specialization = specialization;
            newUser.doctorIdNo = doctorIdNo;
        }

        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});

// login
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        let isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        if (role && user.role !== role) {
            return res.status(403).json({ msg: "Access denied for this role" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});


router.get('/users', async (req, res) => {
    try {
        const doctors = await User.find({ role: 'Doctor' });
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/appointments', authMiddleware, async (req, res) => {
    if (req.user.role !== 'Patient') {
        return res.status(403).json({ msg: "Access denied. Only patients can book appointments." });
    }

    const {doctorId, fullName, dateOfBirth, gender, phoneNo, appointmentTime, appointmentDate, patientSummary, appointmentType, meetingId} = req.body;

    try {
        const newAppointment = new Appointment({
            doctorId,
            fullName,
            dateOfBirth,
            gender,
            phoneNo,
            appointmentTime,
            appointmentDate,
            patientSummary,
            approval: false, 
            completionStatus: false, 
            appointmentType,
            meetingId,
            
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/approve/:meetingId', authMiddleware, async (req, res) => {
    if (req.user.role !== 'Doctor' && req.user.role !== 'Admin') {
        return res.status(403).json({ msg: "Access denied. Only doctors and admins can alter appointments." });
    }
    const { meetingId } = req.params;
    const { approval } = req.body;

    try {
        const appointment = await Appointment.findOne({ meetingId }); 
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        appointment.approval = approval;

        await appointment.save();
        res.status(200).json(appointment);
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});


router.post('/completion/:meetingId', authMiddleware, async (req, res) => {
    if (req.user.role !== 'Doctor' && req.user.role !== 'Admin') {
        return res.status(403).json({ msg: "Access denied. Only doctors and admins can alter appointments." });
    }
    const { meetingId } = req.params;
    const { completionStatus } = req.body;

    try {
        const appointment = await Appointment.findOne({ meetingId }); 
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        appointment.completionStatus = completionStatus;

        await appointment.save();
        res.status(200).json(appointment);
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});




router.get('/doctors/:doctorIdNo', async (req, res) => {
    const { doctorIdNo } = req.params;
    try {
        const doctor = await User.findOne({ doctorIdNo, role: 'Doctor' }); 
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        res.json(doctor); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/doctors', async (req, res) => {
    const { speciality } = req.query;
    try {
        const doctors = await User.find({ specialization: speciality, role: 'Doctor' });
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});


router.get('/appointments/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const appointments = await Appointment.find({ doctorId });
        if (appointments.length === 0) {
            return res.status(404).json({ msg: 'No patients found' });
        }
        res.json(appointments); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/doctors/:doctorIdNo', authMiddleware, async (req, res) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ msg: "Access denied. Only admins can delete doctors." });
    }
  
    const { doctorIdNo } = req.params;
  
    try {
      const result = await User.deleteOne({ doctorIdNo, role: 'Doctor' });
      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'Doctor not found' });
      }
      res.json({ msg: 'Doctor deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });

router.get('/doctors', async (req, res) => {
    try {
        const doctors = await User.find({ role: 'Doctor' });  // Fetches only users with the role 'Doctor'
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/ACTappointment', async (req, res) =>{
const appointments = await Appointment.find({ completionStatus: 'false' });
res.json(appointments);
})



module.exports = router;
