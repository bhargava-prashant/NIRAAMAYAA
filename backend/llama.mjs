import ollama from 'ollama';

export async function chatWithMedi(messages) {
  const response = await ollama.chat({
    model: 'medi',
    messages: messages,
    stream: false,
  });

  return response.message.content;
}
