import EcoLogo from "@/components/EcoLogo";
import FormRegister from "@/components/FormRegister";

const RegisterPage = () => {
	return (
		<div className="flex flex-col items-center my-4">
			<EcoLogo height={100} width={450} />
			<FormRegister />
		</div>
	);
};

export default RegisterPage;
