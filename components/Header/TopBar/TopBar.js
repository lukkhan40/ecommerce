import { useState, useEffect } from "react";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="logo" />
      </a>
    </Link>
  );
};

const Search = () => {
  const [searchStr, setSearchStr] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (load) router.push(`/search?query=${searchStr}`);

    setLoad(true);
  };

  useEffect(() => {
    handleSearch();
  }, [searchStr]); // eslint-disable-line

  return (
    <Input
      id="search-game"
      icon={{ name: "search" }}
      value={router.query.query}
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
};
