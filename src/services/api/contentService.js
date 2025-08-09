import contentData from "@/services/mockData/content.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const contentService = {
  async getAll() {
    await delay(300);
    return [...contentData];
  },

  async getById(id) {
    await delay(200);
    const content = contentData.find(item => item.Id === id);
    if (!content) {
      throw new Error("Content not found");
    }
    return { ...content };
  },

  async getBySection(section) {
    await delay(300);
    return contentData.filter(item => item.section === section).map(item => ({ ...item }));
  },

  async search(query) {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    return contentData
      .filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.author.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      )
      .map(item => ({ ...item }));
  },

  async create(item) {
    await delay(500);
    const maxId = Math.max(...contentData.map(c => c.Id), 0);
    const newItem = { ...item, Id: maxId + 1 };
    contentData.push(newItem);
    return { ...newItem };
  },

  async update(id, data) {
    await delay(400);
    const index = contentData.findIndex(item => item.Id === id);
    if (index === -1) {
      throw new Error("Content not found");
    }
    contentData[index] = { ...contentData[index], ...data };
    return { ...contentData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = contentData.findIndex(item => item.Id === id);
    if (index === -1) {
      throw new Error("Content not found");
    }
    const deleted = contentData.splice(index, 1)[0];
    return { ...deleted };
  }
};