import { MainLayout } from "@layouts/index";
import GradientLink from "@components/common/buttons/GradientLink";
import s from "@styles/Error.module.scss";

export default function Error404() {
  return (
    <MainLayout>
      <h2 className={s.title}>404: nothing interesting here.</h2>
      <p className={s.description}>
        <GradientLink to={`/`} text={"Go back to safety"} />
      </p>
    </MainLayout>
  );
}
