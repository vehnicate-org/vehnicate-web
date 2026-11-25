// phone-frame preview for the app setup stepper (sticky preview)
const DeviceFrame = ({ activeStep }) => {
  const screens = {
    1: '/app_homepage.png',
    2: '/dataCollection_screen.jpeg',
    3: '/appOnMount.png',
    4: '/garage.jpeg',
    5: '/analysis.png',
  }
  const src = screens[activeStep] || '/app_homepage.png'

  return (
    <div
      className="mx-auto w-full max-w-[300px] rounded-[28px] border-2 p-2"
      style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-subtle)' }}
    >
      <div className="overflow-hidden rounded-[20px]" style={{ background: 'var(--bg)' }}>
        <img
          src={src}
          alt={`app screen for step ${activeStep ?? '—'}`}
          className="block h-[460px] w-full object-cover object-top"
        />
      </div>
    </div>
  )
}

export default DeviceFrame
