# Developer Portfolio Generator

A powerful web application that converts Markdown-based resumes and portfolios into beautiful, customizable websites with GitHub Pages deployment.

## Features

- **Markdown to HTML Conversion**: Full GitHub Flavored Markdown support with remark
- **Live Preview**: Real-time preview of your portfolio as you type
- **Multiple Themes**: Choose from Modern, Dark, Minimal, and Colorful themes
- **GitHub Integration**: Deploy directly to GitHub Pages with one click
- **Responsive Design**: Mobile-first design that looks great on all devices
- **Export Options**: Download as HTML file for self-hosting
- **Customizable**: Easy theme switching and section customization

## Getting Started

### Prerequisites

- Node.js 18+ 
- GitHub account (for deployment)
- GitHub Personal Access Token (for deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/Vasantjv-2005/portfolio-generator.git
cd portfolio-generator
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating Your Portfolio

1. **Edit Markdown**: Use the left panel to write your portfolio content in Markdown
2. **Choose Theme**: Select from available themes using the dropdown
3. **Live Preview**: See your changes in real-time in the right panel
4. **Export**: Download as HTML or deploy to GitHub Pages

### Markdown Structure

Your portfolio should follow this structure:

\`\`\`markdown
# Your Name
## Your Title

### Contact
- Email: your.email@example.com
- Phone: +1 (555) 123-4567
- Location: Your City, State
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [github.com/yourusername](https://github.com/yourusername)

### About Me
Brief description about yourself...

### Skills
- **Category:** Skill 1, Skill 2, Skill 3

### Experience
#### Job Title | Company Name
*Start Date - End Date*
- Achievement or responsibility
- Another achievement

### Projects
#### Project Name
Description of the project
- **Tech Stack:** Technologies used
- **Features:** Key features
- [Live Demo](https://example.com) | [GitHub](https://github.com/username/repo)

### Education
#### Degree | Institution
*Years*
- Relevant details

### Certifications
- Certification Name (Year)
\`\`\`

### GitHub Deployment

1. **Get GitHub Token**: 
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with repo permissions

2. **Deploy**:
   - Click "Deploy to GitHub" button
   - Enter your GitHub token and repository name
   - Your portfolio will be available at: `https://vasantjv-2005.github.io/your-repo-name`

## Themes

### Modern
- Clean, professional design
- Blue accent colors
- Perfect for corporate environments

### Dark
- Dark background with purple accents
- Great for developers and tech professionals
- Easy on the eyes

### Minimal
- Black and white design
- Focuses on content
- Timeless and elegant

### Colorful
- Gradient backgrounds
- Pink and orange accents
- Creative and vibrant

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Markdown Processing**: remark, remark-html, remark-gfm
- **Icons**: Lucide React
- **Deployment**: Vercel, GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainer: Vasantjv-2005

## Roadmap

- [ ] More theme options
- [ ] Custom CSS editor
- [ ] PDF export functionality
- [ ] Template gallery
- [ ] Social media integration
- [ ] Analytics integration
- [ ] Multi-language support

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Icons by Lucide
- Markdown processing by remark
- UI components by shadcn/ui
\`\`\`
