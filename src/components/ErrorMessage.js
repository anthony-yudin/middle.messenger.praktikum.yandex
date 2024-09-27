export default `
  <main class="error-page">
    <div class="error-page__box">
      <div class="error-page__title">{{ error }}</div>
      <div class="error-page__desc">{{ text }}</div>
      {{> Link href="#" class="error-page__link" data-page="chat" text="Назад к чатам" }}
    </div>
  </main>
`
