# Contributing to QuickFetch

Thank you for your interest in contributing to QuickFetch! This guide will help you get started.

## Code of Conduct

### Our Pledge

QuickFetch is built on principles of:
- **Legality**: All features must comply with laws and platform terms
- **Ethics**: Respect content creators' rights
- **Privacy**: User privacy is paramount
- **Transparency**: Clear communication about capabilities and limitations

### What We Accept

✅ **Welcomed Contributions:**
- Bug fixes and security improvements
- Performance optimizations
- UI/UX enhancements
- Documentation improvements
- Legal compliance improvements
- Accessibility features
- Additional legal metadata sources
- Test coverage improvements

❌ **Rejected Contributions:**
- Features that violate platform terms of service
- Copyright infringement mechanisms
- DRM bypassing tools
- User tracking or data collection
- Features that compromise privacy or security

## Getting Started

### Prerequisites

- Node.js 18+
- Git
- YouTube Data API key (for testing)
- Familiarity with Next.js and TypeScript

### Development Setup

1. **Fork and clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/quickFetch.git
   cd quickFetch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your API keys
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Make your changes**

6. **Test thoroughly**
   - Test all affected functionality
   - Check for TypeScript errors: `npm run lint`
   - Build the project: `npm run build`

## Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Write clear, commented code
   - Follow existing code style
   - Update documentation if needed

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commits:
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Test additions/changes
   - `chore:` Maintenance tasks

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a pull request on GitHub.

5. **PR Description**
   Include:
   - What changes were made
   - Why they were made
   - How to test them
   - Screenshots (if UI changes)
   - Legal compliance confirmation

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define interfaces for data structures
- Use type annotations
- Avoid `any` types

### React/Next.js
- Use functional components with hooks
- Use `'use client'` directive for client components
- Keep components small and focused
- Use proper prop typing

### Styling
- Use Tailwind CSS classes
- Follow responsive design patterns
- Support dark mode
- Maintain accessibility (ARIA labels, etc.)

### Code Organization
```
/app                 # Next.js app router pages
  /api              # API routes
  layout.tsx        # Root layout
  page.tsx          # Home page
/components         # React components
/lib                # Utility functions
/types              # TypeScript types
/public             # Static assets
```

## Testing

### Manual Testing Checklist

Before submitting a PR:
- [ ] Legal disclaimer displays correctly
- [ ] All form inputs validate properly
- [ ] API endpoints return correct data
- [ ] Rate limiting works
- [ ] Error messages are clear
- [ ] UI is responsive
- [ ] Dark mode works
- [ ] Security headers present
- [ ] No console errors
- [ ] Build completes successfully

### Test URLs

Use these for testing:
- YouTube: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Vimeo: `https://vimeo.com/148751763` (public video)

## Legal Requirements

### Before Contributing

Ensure your PR:
1. Does not violate any platform terms of service
2. Does not enable copyright infringement
3. Respects user privacy (no data collection)
4. Maintains security standards
5. Includes proper error handling

### Legal Checklist

- [ ] No downloading mechanisms added
- [ ] No API bypassing or scraping
- [ ] No user data storage
- [ ] No tracking code
- [ ] Maintains rate limiting
- [ ] Uses official APIs only
- [ ] Respects robots.txt and terms of service

## Documentation

Update documentation when:
- Adding new features
- Changing API behavior
- Modifying configuration options
- Adding dependencies
- Changing deployment process

Files to update:
- `README.md` - User-facing documentation
- `SECURITY.md` - Security-related changes
- Code comments - Inline documentation
- `CONTRIBUTING.md` - Contribution process changes

## Review Process

1. **Automated Checks**
   - TypeScript compilation
   - Linting rules
   - Build success

2. **Manual Review**
   - Code quality
   - Legal compliance
   - Security implications
   - User experience

3. **Feedback**
   - Address review comments
   - Make requested changes
   - Update PR description if needed

4. **Merge**
   - Approved PRs will be merged by maintainers
   - Squash merge for clean history

## Getting Help

- **Questions?** Open a discussion on GitHub
- **Bug?** Open an issue with reproduction steps
- **Security?** Email privately (see SECURITY.md)

## Recognition

Contributors will be:
- Listed in GitHub contributors
- Mentioned in release notes (if significant contribution)
- Appreciated for their ethical contributions! 🙏

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make QuickFetch better while keeping it legal and ethical! 🎉
