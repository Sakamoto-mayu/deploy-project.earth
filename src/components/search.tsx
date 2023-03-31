import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import styles from "../styles/search.module.css";
import { Box, Input, Text } from "@chakra-ui/react";
import { apiPost } from "@/lib/fetchRelation/APIPOST/apiPost";

type sujjestOption = {
  id: number;
  name: string;
  textsearch: string;
};

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSubmit = function (event: SyntheticEvent) {
    event.preventDefault();
    // 大文字で入力された場合、小文字に変換
    const searchWordsToLowerCase = search.toLowerCase();
    // 前後の空白があれば削除
    const searchWords = searchWordsToLowerCase.trim();
    // エンコード
    const uri = encodeURI(searchWords);
    setSearch("");
    router.push(`/farmers?search=${uri}&page=1`);
  };
  // sajest-------------------------------------------------------------
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [options, setOptipns] = useState<sujjestOption[]>([]);

  useEffect(() => {
    sujjestFun();
  }, []);

  async function sujjestFun() {
    const data = await apiPost("/getRelations/suggestRelation/suggest", 0);
    const textsearch = await data.json();
    setOptipns(textsearch);
  }

  const handleChange = (word: any) => {
    let text = word.target.value;
    let escape = /\\/;
    if (escape.test(text)) {
      return (text = text.replace(/\//g, "/\\"));
    }
    let matches: any = [];
    if (text.length > 0) {
      matches = options.filter((opt: any) => {
        const regex = new RegExp(`${text}`, "ig");
        return opt.searchtext.match(regex);
      });
    } else {
      setIsFocus(false);
    }

    matches.length > 0 ? setIsFocus(true) : setIsFocus(false);
    setSearch(text);
    setSuggestions(matches);
  };
  // sajest--------------------------------------------------------------

  return (
    <div className={styles.search}>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={styles.search_form}
      >
        <label htmlFor="search">
          <Input
            onChange={(word) => {
              handleChange(word);
            }}
            type="text"
            id="search"
            name="search"
            value={search}
            placeholder="お探しの野菜は？"
          />
        </label>
        {isFocus && (
          <Box
            position="absolute"
            bottom="-100%"
            zIndex="2"
            w="100%"
            h="100%"
            boxShadow="md"
            bg="white"
            mt="8px"
            borderRadius="lg"
          >
            {suggestions.map((suggestion: any, i) => (
              <Text
                cursor="pointer"
                bg="white"
                _hover={{ bg: "gray.100" }}
                key={i}
                p="8px 8px"
                onClick={() => {
                  setIsFocus(false), setSearch(suggestion.text);
                }}
              >
                {suggestion.text}
              </Text>
            ))}
          </Box>
        )}
        <button type="submit"></button>
      </form>
    </div>
  );
}
