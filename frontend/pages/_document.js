import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MKJTSMELK0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MKJTSMELK0');
            `
          }}
        />

        {/* Ezoic Privacy Scripts - Must load first for compliance */}
        <script
          src="https://cmp.gatekeeperconsent.com/min.js"
          data-cfasync="false"
        />
        <script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          data-cfasync="false"
        />

        {/* Ezoic Header Script */}
        <script async src="//www.ezojs.com/ezoic/sa.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `
          }}
        />

        {/* Google Translate */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'es',
                  includedLanguages: 'en,fr,de,it,pt,nl,pl,ru,zh-CN,ja,ko,ar,tr',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `
          }}
        />
        <script async src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
      </Head>
      <body className="notranslate">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
