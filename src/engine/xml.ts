import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import type { Node as XmlNode } from "@xmldom/xmldom";

export const WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
export const REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships";
export const OFFICE_REL_NS =
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
export const CONTENT_TYPES_NS =
  "http://schemas.openxmlformats.org/package/2006/content-types";
export const XML_NS = "http://www.w3.org/XML/1998/namespace";

/** Remove XML 1.0 control characters and replace unpaired UTF-16 surrogates. */
export function sanitizeXmlText(value: string): string {
  let result = "";
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x08 || code === 0x0b || code === 0x0c || (code >= 0x0e && code <= 0x1f)) {
      continue;
    }
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        result += value[index] + value[index + 1];
        index += 1;
      } else {
        result += "�";
      }
      continue;
    }
    if (code >= 0xdc00 && code <= 0xdfff) result += "�";
    else result += value[index];
  }
  return result;
}

/** Parse XML and throw on malformed input; parser diagnostics are included in the error. */
export function parseXml(xml: string, label: string): Document {
  const diagnostics: string[] = [];
  const parser = new DOMParser({
    onError(level, message) {
      if (level !== "warning") diagnostics.push(message);
    },
  });
  const document = parser.parseFromString(xml, "application/xml") as unknown as Document;
  const parserErrors = elementsByLocalName(document, "parsererror");
  if (diagnostics.length > 0 || parserErrors.length > 0) {
    const detail = diagnostics[0] ?? parserErrors[0]?.textContent ?? "malformed XML";
    throw new Error(`Invalid XML in ${label}: ${detail}`);
  }
  return document;
}

/** Serialize a DOM without reformatting its element tree. */
export function serializeXml(document: Document): string {
  return new XMLSerializer().serializeToString(document as unknown as XmlNode);
}

/** Return descendant elements with the requested local name. */
export function elementsByLocalName(root: Node, localName: string): Element[] {
  const result: Element[] = [];
  const visit = (node: Node): void => {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 1) {
        const element = child as Element;
        if (element.localName === localName || element.nodeName === `w:${localName}`) result.push(element);
        visit(element);
      }
    }
  };
  visit(root);
  return result;
}

/** Read a namespaced OOXML attribute, tolerating producers that omit namespace metadata. */
export function wordAttribute(element: Element, name: string): string | undefined {
  return (
    element.getAttributeNS(WORD_NS, name) ??
    element.getAttribute(`w:${name}`) ??
    element.getAttribute(name) ??
    undefined
  );
}

/** Find the first direct child with a local name. */
export function directChild(element: Element, localName: string): Element | undefined {
  for (let child = element.firstChild; child; child = child.nextSibling) {
    if (
      child.nodeType === 1 &&
      ((child as Element).localName === localName || child.nodeName === `w:${localName}`)
    ) {
      return child as Element;
    }
  }
  return undefined;
}

/** Create a `w:` element in the WordprocessingML namespace. */
export function createWordElement(document: Document, localName: string): Element {
  return document.createElementNS(WORD_NS, `w:${localName}`);
}

/** Set a `w:` attribute in the WordprocessingML namespace. */
export function setWordAttribute(element: Element, name: string, value: string): void {
  element.setAttributeNS(WORD_NS, `w:${name}`, value);
}
