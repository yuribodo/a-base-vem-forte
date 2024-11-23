import EcoLogo from "@/components/EcoLogo";
import FormLogin from "@/components/FormLogin";

const LoginPage = () => {
	return (
		<div className="bg-transparent min-w-[400px] min-h-[390px] mx-auto flex flex-col items-center px-6">
			<EcoLogo height={100} width={450} />
			<FormLogin />
		</div>
	);
};

export default LoginPage;
