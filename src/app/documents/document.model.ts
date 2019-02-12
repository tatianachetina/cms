export class Document {

  id: string;
  name: string;
  description: string;
  url: string;
  children: Document[];

  constructor(name: string, description: string, url: string, children: Document[]) {

    this.name = name;
    this.description = description;
    this.url = url;
    this.children = children;
  }
}