export default function Contact() {
  return (
    <div className="contact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
      <p style={{ textAlign: 'center' }}>If you have any questions or feedback, feel free to reach out to us!</p>
        <form className="contact-form" style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px', marginTop: '20px' }}>
            <label htmlFor="name" style={{ marginTop: '10px' }}>Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email" style={{ marginTop: '10px' }}>Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message" style={{ marginTop: '10px' }}>Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
            <button type="submit" style={{ marginTop: '10px', color: 'white', backgroundColor: 'blue', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
        </form>
        
    </div>
  );
}

      