import Image from 'next/image'
import Link from 'next/link'
import { SContainer } from './styles'

export default function About() {
  return (
    <SContainer>
      <div className="tmdb">
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <Link href="https://www.themoviedb.org/">
          <a target="_blank" rel="noreferrer noopener" className="img">
            <Image src="/tmdb-logo.png" layout="fill" />
          </a>
        </Link>
      </div>

      <div className="social">
        <Link href="https://github.com/rrafaelc/CS50-FInal-Project">
          <a target="_blank" rel="noreferrer noopener" className="github">
            <Image src="/github-logo.svg" layout="fill" />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/carlos-rafael-da-costa-8a9081246/">
          <a target="_blank" rel="noreferrer noopener" className="linkedin">
            <Image src="/linkedin-logo.svg" layout="fill" />
          </a>
        </Link>
      </div>
    </SContainer>
  )
}
