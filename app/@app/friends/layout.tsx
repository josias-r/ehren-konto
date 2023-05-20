interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

export default Layout;
