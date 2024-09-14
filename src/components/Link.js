export default `
  <a href="{{ href }}" class="{{ class }}" data-page="{{ data-page }}">
    {{ text }}
    
    {{# if class_icon }}
      {{# if icon }}
        <svg class="{{ class_icon }}"><use xlink:href="#{{ icon }}" /></svg>
      {{/ if }}
    {{/ if }}
  </a>
`;
