
export function topicDisplayName(topic: { name: string, commonName?: string, lang?: string, type?: string }, language?: string) {
    if (topic.commonName) {
        return topic.commonName;
    }
    language = language || topic.lang;

    if (topic.type === 'PERSON' && language) {
        return getPersonDisplayName(topic.name, language);
    }

    return topic.name;
}

export function getPersonDisplayName(name: string, lang: string) {
    if (lang === 'ru') {
        const parts = name.split(/\s*,\s*/);
        if (parts.length !== 2) {
            return name;
        }
        const fName = parts[1].split(/\s+/)[0];
        const lName = parts[0];
        const displayName = `${fName} ${lName}`;

        return displayName;
    }

    return name;
}
