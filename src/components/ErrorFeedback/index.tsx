interface ErrorFeedbackProps {
  relative?: boolean
}

export const ErrorFeedback = ({ relative = false }: ErrorFeedbackProps) => (
  <div style={relative ? {} : { position: 'absolute', left: '50%', top: '50%' }}>
    Ошибка при получении данных
  </div>
)
