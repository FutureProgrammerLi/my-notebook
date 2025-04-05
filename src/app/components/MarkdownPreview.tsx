'use client'
import Markdown from "react-markdown";
type Props = {
    noteText:string;
}
function MarkdownPreview({noteText}:Props) {
    console.log(noteText);
    return <Markdown>{noteText}</Markdown>;
}

export default MarkdownPreview;