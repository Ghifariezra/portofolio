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

export function LoginForm() {
	const { formLogin, onSubmit, loading, error } = useAuth();

	return (
		<Form {...formLogin}>
			<form
				onSubmit={formLogin.handleSubmit(onSubmit)}
				className="space-y-4">
				<FormField
					control={formLogin.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Username" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={formLogin.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="********"
									{...field}
									autoComplete="off"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				<Button
					type="submit"
					className="w-full font-semibold"
					disabled={loading}>
					{loading ? "Loading..." : "Login"}
				</Button>
			</form>
		</Form>
	);
}
