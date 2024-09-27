export default `
  {{# each data }}
    <div class="form-auth-reg__item">
      <label class="form-auth-reg__item-title" for="{{ this.name }}">{{ this.name_ru }}</label>
      <input type="{{ this.type }}" class="form-auth-reg__item-input" name="{{ this.name }}" id="{{ this.name }}">
    </div>

    {{# if this.error }}
      <div class="form-auth-reg__item-error">{{ this.error }}</div>
    {{/ if }}
  {{/ each }}
`
