/**
 * Function to decode HTML tags in strings that have been encoded.
 * e.g. "&lt;p&gt;Picture messages may not be included in your plan. &lt;&#47;p&gt;"
 * is decoded to  "<p>Picture messages may not be included in your plan.</p>"
 */

export function decodeHtml(unsafeText: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = unsafeText;
  return txt.value;
}
