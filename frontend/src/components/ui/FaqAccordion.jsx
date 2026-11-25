import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const FaqAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const answerId = `faq-answer-${i}`
        return (
          <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <button
              className="faq-trigger"
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span className="faq-number">0{i + 1}</span>
              <span>{item.q}</span>
              <span className="faq-toggle" aria-hidden="true">{isOpen ? <Minus size={17} /> : <Plus size={17} />}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  className="faq-answer-wrap"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="faq-answer">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}

export default FaqAccordion
