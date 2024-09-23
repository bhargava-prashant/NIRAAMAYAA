export const formatUniqueId = (id) => {
    if (!id) return 'XXXX-XXXX-XXXX-XXXX'; 
    return id.match(/.{1,4}/g).join('-');
  };

  