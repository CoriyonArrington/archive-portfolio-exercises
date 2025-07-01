import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Blockquote } from "@/components/ui/typography"

export default function TypographyExample() {
  return (
    <div className="container py-10 space-y-8">
      <div>
        <H1>Montserrat Heading 1</H1>
        <P>This paragraph is in Nunito Sans. The quick brown fox jumps over the lazy dog.</P>
      </div>

      <div>
        <H2>Montserrat Heading 2</H2>
        <P>This paragraph is in Nunito Sans. The quick brown fox jumps over the lazy dog.</P>
      </div>

      <div>
        <H3>Montserrat Heading 3</H3>
        <P>This paragraph is in Nunito Sans. The quick brown fox jumps over the lazy dog.</P>
      </div>

      <div>
        <H4>Montserrat Heading 4</H4>
        <P>This paragraph is in Nunito Sans. The quick brown fox jumps over the lazy dog.</P>
      </div>

      <div>
        <Lead>This is a lead paragraph in Nunito Sans with muted foreground color.</Lead>
      </div>

      <div>
        <Large>This is large text in Nunito Sans.</Large>
      </div>

      <div>
        <Small>This is small text in Nunito Sans.</Small>
      </div>

      <div>
        <Muted>This is muted text in Nunito Sans.</Muted>
      </div>

      <div>
        <Blockquote>This is a blockquote in Nunito Sans with a primary border.</Blockquote>
      </div>
    </div>
  )
}
