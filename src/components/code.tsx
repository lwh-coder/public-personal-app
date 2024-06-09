"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import {  atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from '@/components/ui/button';
import { clipboard } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
export default function Code({ code, lang }: { code: string, lang: any }) {
    const copy = () => {
        navigator.clipboard.writeText(code);
    }
    return(
        <>
        <SyntaxHighlighter language={lang} theme={atomOneDark} showLineNumbers>
            {code }
        </SyntaxHighlighter>
        <Button onClick={copy}><IonIcon icon={clipboard} /></Button>
        </>
    )
}