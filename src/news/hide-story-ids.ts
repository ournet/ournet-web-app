const DATA: string[] = require("../../data/hide-story-ids.json");

export function shouldHideStory(id: string) {
  return DATA.includes(id);
}
