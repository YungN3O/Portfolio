import { HiMail } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row sm:px-8">
        {/* TODO: name from content.js */}
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-muted">
          {/* TODO: real GitHub URL */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition hover:text-accent"
          >
            <FaGithub size={20} />
          </a>
          {/* TODO: real LinkedIn URL (or remove) */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-accent"
          >
            <FaLinkedin size={20} />
          </a>
          {/* TODO: real email */}
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition hover:text-accent"
          >
            <HiMail size={20} />
          </a>
        </div>


      </div>
    </footer>
  )
}
