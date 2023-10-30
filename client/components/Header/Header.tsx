import { Button } from "@/UI/Button/Button";
import { Icon } from "@/UI/Icon/Icon";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser/useUser";
import useLogout from "@/hooks/useLogout/useLogout";

const HeaderStyled = {
  Button: styled(Button)`
    height: 54px;
  `,
};

export default function Header() {
  const { user: me } = useUser();
  const logout = useLogout();

  const router = useRouter();

  return (
    <>
      <Title style={{ textAlign: "center" }}>KyoHealth Todo</Title>
      {me ? (
        <HeaderStyled.Button
          style={{ marginLeft: "auto" }}
          aria-label="Log Out"
          onClick={logout}
        >
          {me.name} | Log Out
        </HeaderStyled.Button>
      ) : (
        <HeaderStyled.Button
          style={{ marginLeft: "auto" }}
          icon={<Icon name="google" />}
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/login`,
            )
          }
          aria-label="Login"
        >
          Log In
        </HeaderStyled.Button>
      )}
    </>
  );
}
