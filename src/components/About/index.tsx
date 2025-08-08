import Image from "next/image";
import { SContainer } from "./styles";

export default function About() {
  return (
    <SContainer>
      <div className="tmdb">
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer noopener"
          className="img"
        >
          <Image src="/tmdb-logo.png" fill alt="TMDB" />
        </a>
      </div>

      <div className="social">
        <a
          href="https://github.com/rrafaelc/CS50-Final-Project"
          target="_blank"
          rel="noreferrer noopener"
          className="github"
        >
          <Image src="/github-logo.svg" fill alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/carlos-rafael-da-costa-8a9081246/"
          target="_blank"
          rel="noreferrer noopener"
          className="linkedin"
        >
          <Image src="/linkedin-logo.svg" fill alt="LinkedIn" />
        </a>
      </div>
    </SContainer>
  );
}
