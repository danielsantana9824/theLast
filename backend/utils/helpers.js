module.exports = {
  generateOrderNumber: () => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  }
}; 