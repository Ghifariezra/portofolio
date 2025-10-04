import { LoginForm } from "@/app/_components/common/form/login";

export default function Login() {
	return (
		<div className="flex min-h-screen items-center justify-center py-6 px-6">
			<div className="flex flex-col gap-4 glassess border-glassess rounded-2xl max-w-sm w-full h-full p-6">
				<h1 className="text-2xl font-bold">Login</h1>
                <LoginForm />
			</div>
		</div>
	);
}
