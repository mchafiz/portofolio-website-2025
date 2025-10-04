const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-muted-foreground">
          <p>&copy; {currentYear} Your Name. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with Next.js, TypeScript, and shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;