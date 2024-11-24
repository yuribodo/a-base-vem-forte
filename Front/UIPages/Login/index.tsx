import EcoLogo from "@/components/EcoLogo";
import FormLogin from "@/components/FormLogin";

const LoginPage = () => {
	return (
		<div className="flex flex-col items-center">
			<EcoLogo height={100} width={450} />
			<FormLogin />
		</div>
	);
};

export default LoginPage;
