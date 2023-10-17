interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}

export default AuthLayout;
