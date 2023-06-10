interface NewLayoutProps {
  children: React.ReactNode;
}

function NewLayout({ children }: NewLayoutProps) {
  return <main className="mx-auto max-w-md p-4">{children}</main>;
}

export default NewLayout;
