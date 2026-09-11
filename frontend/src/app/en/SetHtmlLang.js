'use client'
import { useEffect } from 'react'

// Das Root-Layout setzt lang="de" statisch (siehe app/layout.js — bewusst kein headers()-Aufruf
// dort, damit die Seite prerendert werden kann). Für /en/* wird lang hier nach dem Mounten auf
// "en" korrigiert statt zur Laufzeit serverseitig berechnet zu werden.
export default function SetHtmlLang() {
    useEffect(() => {
        document.documentElement.lang = 'en'
    }, [])
    return null
}
