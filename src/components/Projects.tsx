import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/styles/Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI Resume Optimizer',
    description: 'Analyzes resumes against job descriptions and provides ATS-friendly optimization suggestions using NLP.',
    tags: ['Python', 'NLP', 'Streamlit'],
    code: `import streamlit as st
import spacy
nlp = spacy.load("en_core_web_sm")

def optimize_resume(resume_text, job_desc):
    resume_doc = nlp(resume_text)
    job_doc = nlp(job_desc)
    resume_keywords = set(token.lemma_.lower() for token in resume_doc if not token.is_stop)
    job_keywords = set(token.lemma_.lower() for token in job_doc if not token.is_stop)
    missing = job_keywords - resume_keywords
    return {
        "match_score": len(resume_keywords & job_keywords) / len(job_keywords) * 100,
        "missing_keywords": list(missing)[:10],
        "suggestions": [f"Add '{kw}' to your resume" for kw in missing[:5]]
    }

st.title("AI Resume Optimizer")
resume = st.text_area("Paste your resume")
job = st.text_area("Paste job description")
if st.button("Optimize"):
    result = optimize_resume(resume, job)
    st.metric("Match Score", f"{result['match_score']:.1f}%")
    st.write("Missing Keywords:", result["missing_keywords"])
    st.write("Suggestions:", result["suggestions"])`,
  },
  {
    title: 'Smart Invoice Generator',
    description: 'Auto-generates professional invoices from CSV data with tax calculations and PDF export.',
    tags: ['Python', 'Pandas', 'FPDF'],
    code: `import pandas as pd
from fpdf import FPDF

class InvoiceGenerator(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 16)
        self.cell(0, 10, "INVOICE", ln=True, align="C")
        self.ln(10)

    def add_item(self, desc, qty, rate):
        total = qty * rate
        self.set_font("Helvetica", "", 11)
        self.cell(80, 8, desc)
        self.cell(30, 8, str(qty), align="C")
        self.cell(40, 8, f"Rs.{rate:,.2f}", align="R")
        self.cell(40, 8, f"Rs.{total:,.2f}", ln=True, align="R")
        return total

def generate_invoice(data_file, output="invoice.pdf"):
    df = pd.read_csv(data_file)
    pdf = InvoiceGenerator()
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(80, 8, "Description")
    pdf.cell(30, 8, "Qty", align="C")
    pdf.cell(40, 8, "Rate", align="R")
    pdf.cell(40, 8, "Amount", ln=True, align="R")
    total = sum(pdf.add_item(r.desc, r.qty, r.rate) for _, r in df.iterrows())
    tax = total * 0.18
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(150, 10, f"Total: Rs.{total:,.2f}", ln=True, align="R")
    pdf.cell(150, 10, f"GST (18%): Rs.{tax:,.2f}", ln=True, align="R")
    pdf.cell(150, 10, f"Grand Total: Rs.{total+tax:,.2f}", ln=True, align="R")
    pdf.output(output)
    return output`,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (!cards) return;

    gsap.fromTo(cards, {
      opacity: 0,
      y: 40,
      rotateX: 10,
    }, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <div className="section-header">
          <span className="section-tag">04</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <div className="project-card" key={i}>
              <div className="project-card-inner">
                {/* Front */}
                <div className="project-front">
                  <div className="project-number">0{i + 1}</div>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>
                  <div className="project-tags">
                    {proj.tags.map((tag, j) => (
                      <span className="project-tag" key={j}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-flip-hint">
                    <span>Click to view code</span>
                  </div>
                </div>

                {/* Back (code) */}
                <div className="project-back">
                  <div className="code-header">
                    <span className="code-dot red" />
                    <span className="code-dot yellow" />
                    <span className="code-dot green" />
                    <span className="code-filename">{proj.title.toLowerCase().replace(/\s/g, '_')}.py</span>
                  </div>
                  <pre className="code-block">
                    <code>{proj.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}