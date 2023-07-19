import React from "react";
import { useRouter } from "next/router";

interface Props {
  payload: string;
}

const NextRedirect: React.FC<Props> = ({ payload }) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push(payload).finally();
  }
  return <div>REDIRECT by Next.router.push(payload)</div>;
};

export default NextRedirect;
