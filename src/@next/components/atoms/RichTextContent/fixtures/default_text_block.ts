const textBlock = `{"blocks": [
    {
      "type" : "header",
      "data" : {
        "level" : 4,
        "text" : "Editor.js React Renderer!"
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum."
      }
    },
    {
      "type": "quote",
      "data": {
        "text": "&nbsp;<b>Lorem</b>&nbsp; ipsum dolor sit amet <mark class='cdx-marker'>consectetur</mark> adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum.",
        "caption": "Anonymous",
        "alignment": "left"
      }
    },
    {
      "type": "table",
      "data": {
        "content": [
          ["Name", "Age", "Position", "SSN"],
          ["Jack", "<strong>51</strong>", "All trades", "654654414131333"],
          ["John Doe", "<strong>32</strong>", "Senior Consultant", "0002145465145641"]
        ]
      }
    },
    {
      "type" : "warning",
      "data" : {
        "message" : "This is a warning!"
      }
    },
    {
      "type" : "list",
      "data" : {
        "items" : [
          "<i>Item one</i>",
          "Another item",
          "<strong>Item 3</strong>"
        ],
        "style" : "ordered"
      }
    }
]}`;
export default textBlock;
