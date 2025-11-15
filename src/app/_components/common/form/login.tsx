"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { FieldInput } from "./field/input";

export function LoginForm() {
	const { formLogin, onSubmit, loading } = useAuth();

	return (
		<Form {...formLogin}>
			<form
				onSubmit={formLogin.handleSubmit(onSubmit)}
				className="space-y-4">
				<FieldInput
					form={formLogin}
					name="username"
					label="Username"
					placeholder="Username"
					required={true}
				/>
				<FieldInput
					form={formLogin}
					name="password"
					label="Password"
					placeholder="********"
					type="password"
					required={true}
				/>
				<Button
					type="submit"
					className="w-full font-semibold cursor-pointer"
					disabled={loading}>
					{loading ? "Loading..." : "Login"}
				</Button>
			</form>
		</Form>
	);
}
