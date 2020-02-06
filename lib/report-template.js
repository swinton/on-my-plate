module.exports = `
# :plate_with_cutlery: On my plate for [@{{ assignee }}](https://github.com/swinton)

## :top: High piority ({{high | length}})
{% for item in high %}
- [{{item.title}}]({{item.url}})
{% endfor %}

## :soon: Medium piority ({{medium | length}})
{% for item in medium %}
- [{{item.title}}]({{item.url}})
{% endfor %}

## :no_mouth: Low piority ({{low | length}})
{% for item in low %}
- [{{item.title}}]({{item.url}})
{% endfor %}

## :thinking: No assigned piority ({{tbd | length}})
{% for item in tbd %}
- [{{item.title}}]({{item.url}})
{% endfor %}
`;