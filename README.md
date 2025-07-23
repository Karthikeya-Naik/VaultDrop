## VaultDrop

A secure, simple file storage platform with key-based access - no registration required.

## Features
- Key-Based Access: Access your files with a single unique key - no usernames or passwords
- Multi-Format Support: Store images (JPG, PNG, GIF), videos (MP4, MOV, AVI), documents (PDF, DOC, TXT), and more
- Text Notes: Create and store text notes alongside your files
- No Registration: Start using immediately without creating an account
- Secure Storage: Files are encrypted during transfer and at rest
- Cross-Device Access: Access your vault from any device with your key
- File Management: Upload, download, and delete files with an intuitive interface
- Responsive Design: Works seamlessly on desktop and mobile devices

## Tech Stack
Frontend
- React 18 with Hooks
- React Router for navigation
- Framer Motion for smooth animations
- Tailwind CSS for styling
- Vite for development and building

Backend
- PHP for API endpoints
- MySQL database for file metadata and keys
- RESTful API architecture

## Frontend Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/vaultdrop.git
cd vaultdrop
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure
```
vaultdrop/
├── src/
│   ├── components/
│   │   ├── FileCard.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Home.jsx
│   │   ├── HowItWorks.jsx
│   │   └── Vault.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
├── api/
│   ├── check_key.php
│   ├── delete_all.php
│   ├── delete_file.php
│   ├── get_files.php
│   └── upload.php
└── uploads/ (created automatically)
```

## Security Features
- No Personal Data: No usernames, emails, or personal information required
- Key-Based Authentication: Access controlled solely by unique keys
- Encrypted Transfer: HTTPS encryption for all data transmission
- Secure Storage: Files stored with unique naming to prevent unauthorized access
- No Key Storage: Access keys are never stored in recoverable format

## Contributing
1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## Disclaimer
Remember your access key! We don't store keys in a recoverable format. If you lose your key, you won't be able to access your files.
---
VaultDrop - Secure, simple, and private file storage without the complexity.
