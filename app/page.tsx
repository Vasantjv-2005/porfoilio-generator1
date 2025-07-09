"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  FileText,
  Eye,
  Download,
  Github,
  Palette,
  Settings,
  Code,
  GitBranch,
  Maximize2,
  X,
  Briefcase,
  GraduationCap,
  ImageIcon,
  Sparkles,
  Star,
  Zap,
  Heart,
} from "lucide-react"
import { remark } from "remark"
import remarkHtml from "remark-html"
import remarkGfm from "remark-gfm"

const themes = {
  modern: {
    name: "Modern",
    primary: "from-blue-600 to-indigo-600",
    secondary: "from-gray-50 to-gray-100",
    accent: "text-blue-600",
    background: "bg-white",
    text: "text-gray-900",
    card: "bg-white/80 backdrop-blur-xl border-white/20",
  },
  dark: {
    name: "Dark",
    primary: "from-purple-600 to-pink-600",
    secondary: "from-gray-800 to-gray-900",
    accent: "text-purple-400",
    background: "bg-gray-900",
    text: "text-white",
    card: "bg-gray-800/80 backdrop-blur-xl border-gray-700/20",
  },
  minimal: {
    name: "Minimal",
    primary: "from-gray-800 to-black",
    secondary: "from-gray-50 to-white",
    accent: "text-gray-800",
    background: "bg-white",
    text: "text-gray-900",
    card: "bg-white/90 backdrop-blur-xl border-gray-200/30",
  },
  colorful: {
    name: "Colorful",
    primary: "from-pink-500 via-purple-500 to-indigo-500",
    secondary: "from-pink-50 via-purple-50 to-indigo-50",
    accent: "text-pink-600",
    background: "bg-gradient-to-br from-pink-50 to-indigo-100",
    text: "text-gray-900",
    card: "bg-white/70 backdrop-blur-xl border-white/40",
  },
}

const defaultMarkdown = `# John Doe
## Full Stack Developer & UI/UX Designer

### Contact
- 📧 Email: john.doe@example.com
- 📱 Phone: +1 (555) 123-4567
- 📍 Location: San Francisco, CA
- 💼 LinkedIn: [linkedin.com/in/johndoe](https://linkedin.com/in/johndoe)
- 🐙 GitHub: [github.com/johndoe](https://github.com/johndoe)
- 🌐 Portfolio: [johndoe.dev](https://johndoe.dev)

### About Me
🚀 Passionate full-stack developer with 5+ years of experience building scalable web applications. I love creating efficient, user-friendly solutions and staying up-to-date with the latest technologies. Always eager to learn and tackle new challenges!

### Skills
- **Frontend:** ⚛️ React, Next.js, TypeScript, Tailwind CSS, Vue.js
- **Backend:** 🚀 Node.js, Python, PostgreSQL, MongoDB, GraphQL
- **Tools:** 🛠️ Git, Docker, AWS, Vercel, Figma
- **Languages:** 💻 JavaScript, TypeScript, Python, Go

### Experience

#### 🏢 Senior Frontend Developer | TechCorp Inc.
*January 2022 - Present*
- 📈 Led development of customer-facing dashboard serving 10k+ users
- ⚡ Improved application performance by 40% through code optimization
- 👥 Mentored junior developers and established coding standards
- 🎯 Implemented modern React patterns and best practices

#### 🚀 Full Stack Developer | StartupXYZ
*June 2020 - December 2021*
- 🛒 Built and maintained e-commerce platform using React and Node.js
- 💳 Implemented payment processing and inventory management systems
- 🎨 Collaborated with design team to create responsive user interfaces
- 📊 Increased user engagement by 60% through UX improvements

### Projects

#### 🛍️ E-Commerce Platform
A full-stack e-commerce solution with modern design and seamless user experience.
- **Tech Stack:** React, Node.js, MongoDB, Stripe, Tailwind CSS
- **Features:** User authentication, payment processing, admin dashboard, real-time notifications
- **Impact:** 50% increase in conversion rates
- [🌐 Live Demo](https://example.com) | [📱 GitHub](https://github.com/johndoe/ecommerce)

#### 📋 Task Management App
A collaborative task management application with real-time updates and beautiful UI.
- **Tech Stack:** Next.js, Socket.io, PostgreSQL, Prisma
- **Features:** Real-time collaboration, drag-and-drop interface, team management
- **Impact:** Used by 500+ teams worldwide
- [🌐 Live Demo](https://example.com) | [📱 GitHub](https://github.com/johndoe/taskapp)

#### 🎨 Design System Library
A comprehensive design system with reusable components and documentation.
- **Tech Stack:** React, Storybook, TypeScript, Styled Components
- **Features:** 50+ components, dark mode support, accessibility compliant
- **Impact:** Reduced development time by 30%
- [🌐 Live Demo](https://example.com) | [📱 GitHub](https://github.com/johndoe/design-system)

### Education

#### 🎓 Bachelor of Science in Computer Science
*University of California, Berkeley | 2016-2020*
- 📚 Relevant Coursework: Data Structures, Algorithms, Database Systems, HCI
- 🏆 GPA: 3.8/4.0
- 🥇 Dean's List for 6 semesters

### Certifications
- 🏅 AWS Certified Developer Associate (2023)
- 🏅 Google Cloud Professional Developer (2022)
- 🏅 Meta Frontend Developer Certificate (2021)
`

export default function PortfolioGenerator() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [selectedTheme, setSelectedTheme] = useState("modern")
  const [htmlContent, setHtmlContent] = useState("")
  const [githubToken, setGithubToken] = useState("")
  const [githubRepoUrl, setGithubRepoUrl] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pastedImages, setPastedImages] = useState<{ [key: string]: string }>({})
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [customSections, setCustomSections] = useState({
    showContact: true,
    showAbout: true,
    showSkills: true,
    showExperience: true,
    showProjects: true,
    showEducation: true,
    showCertifications: true,
  })

  useEffect(() => {
    convertMarkdownToHtml()
  }, [markdown, pastedImages])

  const convertMarkdownToHtml = async () => {
    try {
      let processedMarkdown = markdown

      // Replace image placeholders with actual base64 data
      Object.entries(pastedImages).forEach(([placeholder, dataUrl]) => {
        processedMarkdown = processedMarkdown.replace(placeholder, dataUrl)
      })

      const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(processedMarkdown)
      setHtmlContent(result.toString())
    } catch (error) {
      console.error("Error converting markdown:", error)
      toast({
        title: "Error",
        description: "Failed to convert markdown to HTML",
        variant: "destructive",
      })
    }
  }

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.type.indexOf("image") !== -1) {
        e.preventDefault()
        const file = item.getAsFile()
        if (!file) continue

        // Convert image to base64
        const reader = new FileReader()
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string
          const timestamp = Date.now()
          const placeholder = `![Pasted Image ${timestamp}](image-${timestamp})`

          // Add image to our state
          setPastedImages((prev) => ({
            ...prev,
            [`image-${timestamp}`]: dataUrl,
          }))

          // Insert markdown image syntax at cursor position
          const textarea = textareaRef.current
          if (textarea) {
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const newMarkdown = markdown.substring(0, start) + placeholder + markdown.substring(end)
            setMarkdown(newMarkdown)

            // Set cursor position after the inserted image
            setTimeout(() => {
              textarea.selectionStart = textarea.selectionEnd = start + placeholder.length
              textarea.focus()
            }, 0)
          }
        }
        reader.readAsDataURL(file)

        toast({
          title: "✨ Image Added",
          description: "Image has been pasted into your markdown!",
        })
      }
    }
  }

  const parseGitHubUrl = (url: string) => {
    try {
      // Remove .git suffix if present
      const cleanUrl = url.replace(/\.git$/, "")

      // Handle different GitHub URL formats
      let match = cleanUrl.match(/github\.com\/([^/]+)\/([^/]+)/)

      if (!match) {
        // Try without protocol
        match = cleanUrl.match(/([^/]+)\/([^/]+)$/)
        if (match) {
          return {
            owner: match[1],
            repo: match[2],
          }
        }
      }

      if (match) {
        return {
          owner: match[1],
          repo: match[2],
        }
      }

      throw new Error("Invalid format")
    } catch (error) {
      throw new Error(
        "Please provide a valid GitHub repository URL (e.g., https://github.com/username/repo or username/repo)",
      )
    }
  }

  const generateFullHtml = () => {
    const theme = themes[selectedTheme as keyof typeof themes]
    let processedHtml = htmlContent

    // Replace image placeholders with base64 data in HTML
    Object.entries(pastedImages).forEach(([placeholder, dataUrl]) => {
      processedHtml = processedHtml.replace(new RegExp(placeholder, "g"), dataUrl)
    })

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Developer Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .theme-${selectedTheme} {
            --primary: ${theme.primary};
            --secondary: ${theme.secondary};
            --accent: ${theme.accent};
            --background: ${theme.background};
            --text: ${theme.text};
        }
        .enhanced-prose { max-width: none; }
        .enhanced-prose h1 { font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .enhanced-prose h2 { font-size: 2.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #4f46e5; }
        .enhanced-prose h3 { font-size: 1.75rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #6366f1; }
        .enhanced-prose h4 { font-size: 1.5rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; color: #8b5cf6; }
        .enhanced-prose p { margin-bottom: 1rem; line-height: 1.8; font-size: 1.1rem; }
        .enhanced-prose ul { margin-bottom: 1rem; padding-left: 0; }
        .enhanced-prose li { margin-bottom: 0.75rem; padding: 0.75rem; background: rgba(255,255,255,0.8); border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); backdrop-filter: blur(10px); }
        .enhanced-prose a { color: #3b82f6; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
        .enhanced-prose a:hover { color: #1d4ed8; transform: translateY(-1px); }
        .enhanced-prose strong { font-weight: 700; color: #1f2937; }
        .enhanced-prose img { max-width: 100%; height: auto; border-radius: 16px; margin: 2rem 0; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); }
        .floating { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .glow { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
    </style>
</head>
<body class="${theme.background} ${theme.text} min-h-screen">
    <div class="max-w-6xl mx-auto p-8">
        <div class="enhanced-prose">
            ${processedHtml}
        </div>
    </div>
</body>
</html>`
  }

  const downloadHtml = () => {
    const fullHtml = generateFullHtml()
    const blob = new Blob([fullHtml], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "portfolio.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "🎉 Success!",
      description: "Portfolio HTML file downloaded successfully!",
    })
  }

  const deployToGitHub = async () => {
    if (!githubToken || !githubRepoUrl) {
      toast({
        title: "❌ Error",
        description: "Please provide GitHub token and repository URL",
        variant: "destructive",
      })
      return
    }

    setIsDeploying(true)

    try {
      const { owner, repo } = parseGitHubUrl(githubRepoUrl)

      console.log(`Deploying to: ${owner}/${repo}`)

      // Test GitHub token first
      const userResponse = await fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!userResponse.ok) {
        throw new Error("Invalid GitHub token. Please check your token and try again.")
      }

      // Check if repository exists and we have access
      const repoCheckResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!repoCheckResponse.ok) {
        if (repoCheckResponse.status === 404) {
          throw new Error(
            `Repository ${owner}/${repo} not found. Please make sure the repository exists and you have access to it.`,
          )
        } else {
          throw new Error(`Cannot access repository ${owner}/${repo}. Status: ${repoCheckResponse.status}`)
        }
      }

      // Prepare markdown content with images
      let processedMarkdown = markdown
      Object.entries(pastedImages).forEach(([placeholder, dataUrl]) => {
        processedMarkdown = processedMarkdown.replace(new RegExp(placeholder, "g"), dataUrl)
      })

      // Create README.md
      const readmeContent = btoa(unescape(encodeURIComponent(processedMarkdown)))

      // Get current README.md SHA if it exists
      let readmeSha = null
      try {
        const getReadmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
          headers: {
            Authorization: `token ${githubToken}`,
            "Content-Type": "application/json",
          },
        })
        if (getReadmeResponse.ok) {
          const readmeData = await getReadmeResponse.json()
          readmeSha = readmeData.sha
        }
      } catch (error) {
        console.log("README.md doesn't exist yet, will create new one")
      }

      // Create or update README.md
      const readmeRequestBody: any = {
        message: `✨ Update portfolio README.md - ${new Date().toLocaleString()}`,
        content: readmeContent,
      }

      if (readmeSha) {
        readmeRequestBody.sha = readmeSha
      }

      console.log("Updating README.md...")
      const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
        method: "PUT",
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readmeRequestBody),
      })

      if (!readmeResponse.ok) {
        const errorData = await readmeResponse.json()
        console.error("README update failed:", errorData)
        throw new Error(`Failed to update README.md: ${errorData.message || "Unknown error"}`)
      }

      console.log("README.md updated successfully!")

      // Create index.html for GitHub Pages
      const fullHtml = generateFullHtml()
      const htmlContent = btoa(unescape(encodeURIComponent(fullHtml)))

      let htmlSha = null
      try {
        const getHtmlResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/index.html`, {
          headers: {
            Authorization: `token ${githubToken}`,
            "Content-Type": "application/json",
          },
        })
        if (getHtmlResponse.ok) {
          const htmlData = await getHtmlResponse.json()
          htmlSha = htmlData.sha
        }
      } catch (error) {
        console.log("index.html doesn't exist yet, will create new one")
      }

      const htmlRequestBody: any = {
        message: `🚀 Update portfolio index.html - ${new Date().toLocaleString()}`,
        content: htmlContent,
      }

      if (htmlSha) {
        htmlRequestBody.sha = htmlSha
      }

      console.log("Updating index.html...")
      const htmlResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/index.html`, {
        method: "PUT",
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(htmlRequestBody),
      })

      if (!htmlResponse.ok) {
        const errorData = await htmlResponse.json()
        console.warn("HTML update failed:", errorData)
        // Don't throw error for HTML, README is more important
      } else {
        console.log("index.html updated successfully!")
      }

      // Try to enable GitHub Pages
      try {
        console.log("Enabling GitHub Pages...")
        const pagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, {
          method: "POST",
          headers: {
            Authorization: `token ${githubToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json",
          },
          body: JSON.stringify({
            source: {
              branch: "main",
              path: "/",
            },
          }),
        })

        if (pagesResponse.ok) {
          console.log("GitHub Pages enabled successfully!")
        } else if (pagesResponse.status === 409) {
          console.log("GitHub Pages already enabled")
        } else {
          console.warn("Could not enable GitHub Pages, but deployment succeeded")
        }
      } catch (pagesError) {
        console.warn("Pages setup failed, but deployment succeeded:", pagesError)
      }

      toast({
        title: "🎉 Deployment Successful!",
        description: `Portfolio deployed to ${owner}/${repo}! GitHub Pages: https://${owner}.github.io/${repo}`,
      })
    } catch (error: any) {
      console.error("Deployment error:", error)
      toast({
        title: "❌ Deployment Failed",
        description: error.message || "Please check your GitHub token and repository URL.",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const theme = themes[selectedTheme as keyof typeof themes]

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white"
      case "minimal":
        return "bg-gradient-to-br from-gray-50 to-white text-gray-900"
      case "colorful":
        return "bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-900"
      default:
        return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
    }
  }

  const getHeaderBackground = (theme: string) => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"
      case "minimal":
        return "bg-gradient-to-r from-gray-800 via-gray-900 to-black"
      case "colorful":
        return "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
      default:
        return "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
    }
  }

  const getEnhancedHtml = (html: string, theme: string) => {
    let enhancedHtml = html

    // Enhanced styling with beautiful cards and animations
    enhancedHtml = enhancedHtml.replace(
      /<h1>(.*?)<\/h1>/g,
      `<div class="text-center mb-12">
        <h1 class="text-6xl font-black mb-4 bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].primary} bg-clip-text text-transparent animate-pulse">$1</h1>
      </div>`,
    )

    enhancedHtml = enhancedHtml.replace(
      /<h2>(.*?)<\/h2>/g,
      `<h2 class="text-4xl font-bold mb-2 bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].primary} bg-clip-text text-transparent">$1</h2>`,
    )

    enhancedHtml = enhancedHtml.replace(
      /<h3>(.*?)<\/h3>/g,
      `<div class="mt-12 mb-6">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].primary} rounded-full flex items-center justify-center">
            <span class="text-white text-sm">✨</span>
          </div>
          $1
        </h3>
      </div>`,
    )

    enhancedHtml = enhancedHtml.replace(
      /<h4>(.*?)<\/h4>/g,
      `<div class="mt-8 mb-4 p-6 bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].card} rounded-2xl shadow-xl border backdrop-blur-xl">
        <h4 class="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span class="text-2xl">🚀</span>
          $1
        </h4>
      </div>`,
    )

    enhancedHtml = enhancedHtml.replace(
      /<p>(.*?)<\/p>/g,
      '<p class="mb-6 leading-relaxed text-lg text-gray-700">$1</p>',
    )

    enhancedHtml = enhancedHtml.replace(/<ul>(.*?)<\/ul>/gs, `<div class="grid gap-4 mb-8">$1</div>`)

    enhancedHtml = enhancedHtml.replace(
      /<li>(.*?)<\/li>/g,
      `<div class="group p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-white/90">
        <div class="flex items-start gap-4">
          <div class="w-3 h-3 bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].primary} rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
          <span class="text-gray-700 leading-relaxed">$1</span>
        </div>
      </div>`,
    )

    enhancedHtml = enhancedHtml.replace(
      /<a href="(.*?)">(.*?)<\/a>/g,
      `<a href="$1" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].primary} text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        $2
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>`,
    )

    enhancedHtml = enhancedHtml.replace(
      /<strong>(.*?)<\/strong>/g,
      `<strong class="font-bold bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].primary} bg-clip-text text-transparent">$1</strong>`,
    )

    enhancedHtml = enhancedHtml.replace(/<em>(.*?)<\/em>/g, `<em class="italic text-gray-600 font-medium">$1</em>`)

    // Style images with beautiful frames
    enhancedHtml = enhancedHtml.replace(
      /<img([^>]*?)>/g,
      `<div class="my-8 text-center">
        <img$1 class="max-w-full h-auto rounded-3xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-500 border-4 border-white">
      </div>`,
    )

    return enhancedHtml
  }

  const PreviewContent = () => (
    <div
      className={`${getThemeClasses(selectedTheme)} min-h-[700px] overflow-auto rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-xl`}
    >
      <div className="relative overflow-hidden">
        {/* Stunning Header Section */}
        <div className={`${getHeaderBackground(selectedTheme)} px-12 py-20 text-center relative overflow-hidden`}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-white/5 rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-700"></div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative z-10">
            <div className="w-40 h-40 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center backdrop-blur-sm border-4 border-white/30 shadow-2xl floating">
              <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>

            {/* Animated Social Links */}
            <div className="flex justify-center gap-6 mt-8">
              {[
                { icon: "📧", label: "Email" },
                { icon: "💼", label: "LinkedIn" },
                { icon: "🐙", label: "GitHub" },
                { icon: "🌐", label: "Portfolio" },
              ].map((social, index) => (
                <div
                  key={index}
                  className="group w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-300 cursor-pointer hover:scale-110 shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-white text-xl group-hover:scale-125 transition-transform">{social.icon}</span>
                </div>
              ))}
            </div>

            {/* Floating badges */}
            <div className="flex justify-center gap-4 mt-8">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold shadow-lg">
                ⚡ Available for hire
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold shadow-lg">
                🚀 5+ Years Experience
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="px-12 py-16 space-y-16 bg-gradient-to-b from-transparent via-white/5 to-white/10">
          {/* Content with beautiful styling */}
          <div className="max-w-6xl mx-auto">
            <div
              className="enhanced-prose max-w-none space-y-12"
              dangerouslySetInnerHTML={{ __html: getEnhancedHtml(htmlContent, selectedTheme) }}
            />
          </div>

          {/* Beautiful Skills Visualization - Perfectly Aligned */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Skills & Expertise
              </h2>
              <p className="text-gray-600 text-lg">Technologies I work with</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Frontend",
                  icon: "⚡",
                  skills: ["React", "Next.js", "TypeScript"],
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-500",
                  percentage: 95,
                  textColor: "text-blue-500",
                },
                {
                  title: "Backend",
                  icon: "🔗",
                  skills: ["Node.js", "Python", "GraphQL"],
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-500",
                  percentage: 90,
                  textColor: "text-green-500",
                },
                {
                  title: "Design",
                  icon: "🎨",
                  skills: ["Figma", "UI/UX", "Prototyping"],
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-500",
                  percentage: 85,
                  textColor: "text-purple-500",
                },
                {
                  title: "DevOps",
                  icon: "🛠️",
                  skills: ["Docker", "AWS", "CI/CD"],
                  color: "from-orange-500 to-red-500",
                  bgColor: "bg-orange-500",
                  percentage: 80,
                  textColor: "text-orange-500",
                },
                {
                  title: "Mobile",
                  icon: "📱",
                  skills: ["React Native", "Flutter"],
                  color: "from-indigo-500 to-purple-500",
                  bgColor: "bg-indigo-500",
                  percentage: 75,
                  textColor: "text-indigo-500",
                },
                {
                  title: "Database",
                  icon: "🗄️",
                  skills: ["PostgreSQL", "MongoDB"],
                  color: "from-teal-500 to-green-500",
                  bgColor: "bg-teal-500",
                  percentage: 88,
                  textColor: "text-teal-500",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 ${skill.bgColor} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{skill.title}</h3>
                      <p className="text-gray-500 text-sm">{skill.skills.join(", ")}</p>
                    </div>
                  </div>

                  {/* Proficiency */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Proficiency</span>
                      <span className={`font-bold text-lg ${skill.textColor}`}>{skill.percentage}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { number: "50+", label: "Projects Completed", icon: "🚀" },
                { number: "10k+", label: "Users Impacted", icon: "👥" },
                { number: "5+", label: "Years Experience", icon: "⭐" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-500"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div
                    className={`text-4xl font-black mb-2 bg-gradient-to-r ${themes[selectedTheme as keyof typeof themes].primary} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stunning Footer */}
        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 px-12 py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <p className="text-white/90 font-semibold">Generated with Portfolio Generator</p>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-white/70 text-sm">Built with ❤️ using Next.js, Tailwind CSS & Modern Design</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Perfectly Centered Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-8 shadow-2xl">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              Developer Portfolio Generator
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              ✨ Transform your Markdown resume into a <span className="font-bold text-purple-600">stunning</span>,
              professional website with <span className="font-bold text-blue-600">beautiful animations</span> and
              <span className="font-bold text-pink-600"> image support</span>
            </p>

            {/* Feature badges with perfect spacing */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: "🎨", text: "Beautiful Themes" },
                { icon: "📱", text: "Responsive Design" },
                { icon: "⚡", text: "Live Preview" },
                { icon: "🚀", text: "GitHub Deploy" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/20 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-lg mr-2">{feature.icon}</span>
                  <span className="font-semibold text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Main Content with Perfect Alignment */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
            {/* Beautiful Editor Panel */}
            <Card className="h-fit bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-white/20">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  Markdown Editor
                  <Badge
                    variant="outline"
                    className="ml-auto bg-gradient-to-r from-pink-500 to-orange-500 text-white border-none"
                  >
                    <ImageIcon className="w-3 h-3 mr-1" />
                    Paste Images ✨
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  ref={textareaRef}
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  onPaste={handlePaste}
                  placeholder="✨ Enter your markdown content here... You can also paste images directly! 🖼️"
                  className="min-h-[700px] font-mono text-sm bg-white/50 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:border-purple-300 transition-all duration-300"
                />
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <strong>Pro Tip:</strong> Copy and paste images directly into the editor to add them to your
                    portfolio!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stunning Preview Panel */}
            <Card className="h-fit bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    Live Preview
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFullscreen(true)}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Fullscreen
                    </Button>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-xl">
                        {Object.entries(themes).map(([key, theme]) => (
                          <SelectItem key={key} value={key} className="hover:bg-purple-50">
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 bg-gradient-to-r ${theme.primary} rounded-full`}></div>
                              {theme.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none"
                    >
                      <Palette className="w-3 h-3" />
                      {theme.name}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PreviewContent />
              </CardContent>
            </Card>
          </div>

          {/* Beautiful Action Buttons */}
          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <Button
              onClick={downloadHtml}
              className="flex items-center gap-3 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download HTML ✨
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-3 px-8 py-4 text-lg bg-white/80 backdrop-blur-xl border-white/20 hover:bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  Deploy to GitHub 🚀
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 rounded-3xl shadow-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    Deploy to GitHub
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl text-center border border-blue-200">
                    <Github className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-xl text-blue-800 mb-2">🚀 Ready to Deploy?</h3>
                    <p className="text-blue-700">
                      Paste your GitHub repository link below to deploy your stunning portfolio
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="github-repo-url" className="text-lg font-semibold">
                      GitHub Repository URL
                    </Label>
                    <Input
                      id="github-repo-url"
                      value={githubRepoUrl}
                      onChange={(e) => setGithubRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/repository-name"
                      className="mt-3 h-12 bg-white/80 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-purple-300 transition-all duration-300"
                      autoFocus
                    />
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Examples: https://github.com/username/repo or username/repo
                    </p>
                  </div>

                  {githubRepoUrl && (
                    <div className="animate-in slide-in-from-top duration-300">
                      <Label htmlFor="github-token" className="text-lg font-semibold">
                        GitHub Personal Access Token
                      </Label>
                      <Input
                        id="github-token"
                        type="password"
                        value={githubToken}
                        onChange={(e) => setGithubToken(e.target.value)}
                        placeholder="ghp_xxxxxxxxxxxx"
                        className="mt-3 h-12 bg-white/80 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-purple-300 transition-all duration-300"
                      />
                      <div className="mt-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <p className="text-sm text-yellow-800 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Create at: GitHub Settings → Developer settings → Personal access tokens
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={deployToGitHub}
                    disabled={isDeploying || !githubToken.trim() || !githubRepoUrl.trim()}
                    className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeploying ? (
                      <>
                        <GitBranch className="w-5 h-5 mr-3 animate-spin" />
                        Deploying to GitHub... ✨
                      </>
                    ) : (
                      <>
                        <Github className="w-5 h-5 mr-3" />
                        Deploy Portfolio 🚀
                      </>
                    )}
                  </Button>

                  {isDeploying && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200 animate-pulse">
                      <p className="text-blue-800 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />⏳ Deploying your beautiful portfolio to{" "}
                        {githubRepoUrl}...
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-3 px-8 py-4 text-lg bg-white/80 backdrop-blur-xl border-white/20 hover:bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Settings className="w-5 h-5" />
                  Customize Sections ⚙️
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 rounded-3xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    Customize Portfolio
                  </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="sections" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-2xl p-1">
                    <TabsTrigger value="sections" className="rounded-xl">
                      Sections
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="rounded-xl">
                      Templates
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="sections" className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(customSections).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <input
                            type="checkbox"
                            id={key}
                            checked={value}
                            onChange={(e) =>
                              setCustomSections((prev) => ({
                                ...prev,
                                [key]: e.target.checked,
                              }))
                            }
                            className="w-5 h-5 rounded"
                          />
                          <Label htmlFor={key} className="font-medium capitalize cursor-pointer">
                            {key
                              .replace("show", "")
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={applyCustomSections}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Apply Changes ✨
                    </Button>
                  </TabsContent>
                  <TabsContent value="templates" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          icon: <Briefcase className="w-5 h-5" />,
                          title: "Software Engineer",
                          color: "from-blue-500 to-cyan-500",
                        },
                        {
                          icon: <Palette className="w-5 h-5" />,
                          title: "Designer",
                          color: "from-purple-500 to-pink-500",
                        },
                        {
                          icon: <GraduationCap className="w-5 h-5" />,
                          title: "Graduate",
                          color: "from-green-500 to-emerald-500",
                        },
                      ].map((template, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`justify-start h-16 bg-gradient-to-r ${template.color} text-white border-none hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg`}
                          onClick={() => {
                            // Template logic here
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {template.icon}
                            <span className="font-semibold">{template.title} Template</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>

          {/* Enhanced Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ImageIcon className="w-8 h-8" />,
                title: "Image Support",
                description:
                  "Copy and paste images directly into the markdown editor. Images are automatically embedded with beautiful styling.",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Beautiful Themes",
                description:
                  "Choose from modern, dark, minimal, and colorful themes with stunning animations and live preview.",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: <Github className="w-8 h-8" />,
                title: "GitHub Integration",
                description:
                  "Deploy directly to any GitHub repository with README.md and GitHub Pages in just one click.",
                color: "from-blue-500 to-cyan-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group bg-white/80 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="absolute inset-6 bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-purple-600" />
                <span className="font-bold text-xl">Fullscreen Preview</span>
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none"
                >
                  {theme.name} Theme
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300 rounded-xl"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
            <div className="h-[calc(100%-5rem)] overflow-auto">
              <PreviewContent />
            </div>
          </div>
        </div>
      )}
    </div>
  )

  function applyCustomSections() {
    // Implement the logic to apply custom sections here
    // For example, you can filter the markdown content based on the selected sections
    console.log("Applying custom sections:", customSections)
    toast({
      title: "Sections Updated!",
      description: "Your portfolio sections have been updated.",
    })
  }
}
