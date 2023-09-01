import * as React from "react";
import { Sitemap } from "ournet.links";
import { NewsArticleContent, NewsTopic } from "@ournet/api-client";
import { Dictionary } from "@ournet/domain";

export type FormatNewsContentPorps = {
  lang: string;
  links: Sitemap;
  content: NewsArticleContent;
  topics: NewsTopic[];
  maxPhrases: number;
};

export function FormatNewsContent({
  lang,
  links,
  content,
  topics,
  maxPhrases
}: FormatNewsContentPorps) {
  let initialPhrases = content.content.split(/\n+/);

  let phrases: string[] = [];
  for (const phrase of initialPhrases) {
    if (phrase.length > 600) {
      phrases = phrases.concat(textToParagraphs(phrase, 400));
    } else {
      phrases.push(phrase);
    }
  }

  const addPhrases = phrases
    .slice(0, maxPhrases)
    .reduce<number>(
      (total, phrase) => total + (phrase.length < 100 ? 1 : 0),
      0
    );

  phrases = phrases.slice(0, maxPhrases + addPhrases);

  const topicsMap: Dictionary<{
    index: number;
    length: number;
  }> = content.topicsMap;

  if (!topicsMap) {
    return phrases.map((item, pIndex) => (
      <p key={`phrase-i-${pIndex}`}>{item}</p>
    ));
  }
  const ids = Object.keys(topicsMap);
  const mapItems = ids
    .map((id) => ({ id, ...topicsMap[id] }))
    .sort((a, b) => a.index - b.index);

  const list: (string | JSX.Element)[] = [];

  let currentPosition = 0;
  phrases.forEach((phrase, pIndex) => {
    const inPhraseItems = mapItems.filter(
      (item) =>
        item.index > currentPosition &&
        item.index < currentPosition + phrase.length
    );
    if (inPhraseItems.length) {
      let phrasePosition = 0;
      const parts = inPhraseItems.reduce<(string | JSX.Element)[]>(
        (prev, item) => {
          const phraseItemIndex = item.index - currentPosition;

          const topic = topics.find((it) => it.id === item.id);
          let itemParts: (string | JSX.Element)[] = [];
          if (topic) {
            const preTopicText = phrase.substring(
              phrasePosition,
              phraseItemIndex
            );
            const topicText = phrase.substr(phraseItemIndex, item.length);
            // console.log({preTopicText,topicText})
            itemParts = [
              preTopicText,
              <a
                className="c-text-link"
                key={`phrase-a-${pIndex}`}
                title={topic.name}
                href={links.news.topic(topic.slug, { ul: lang })}
              >
                {topicText}
              </a>
            ];
          } else {
            itemParts = [
              phrase.substring(phrasePosition, phraseItemIndex + item.length)
            ];
          }
          phrasePosition = phraseItemIndex + item.length;

          // console.log({phraseItemIndex,phrasePosition})

          return prev.concat(itemParts);
        },
        []
      );
      if (phrasePosition < phrase.length) {
        parts.push(phrase.substr(phrasePosition));
      }

      list.push(<p key={`phrase-p-${pIndex}`}>{parts}</p>);
    } else {
      list.push(<p key={`phrase-i-${pIndex}`}>{phrase}</p>);
    }
    currentPosition += phrase.length + 1;
  });

  return list;
}

function textToParagraphs(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return [text];
  }

  let position = 0;
  const sentences = text.split(/[.?!]\s/).map((item) => {
    item = item + text.substr(position + item.length, 1);
    position += item.length + 1;

    return item;
  });

  const paragraphs: string[] = [""];

  for (const sentence of sentences) {
    let p = (paragraphs[paragraphs.length - 1] + " " + sentence).trim();
    if (p.length > maxLength) {
      paragraphs.push(sentence);
    } else {
      paragraphs[paragraphs.length - 1] = p;
    }
  }

  return paragraphs;
}
