import type { FAQSection } from "@/components/FAQ/FAQ";

export const faqSections: FAQSection[] = [
  {
    title: "General",
    items: [
      {
        question: "What is Triton Software Engineering?",
        answer: (
          <p>
            Triton Software Engineering (TSE) is a multidisciplinary student
            organization at UC San Diego. We partner with nonprofits to design
            and develop software, websites, and mobile applications pro-bono for
            social good, while giving our members practical, real-world
            experience.
          </p>
        ),
      },
      {
        question: "Why should I join TSE?",
        answer: (
          <p>
            If you are passionate about design or development and about helping
            others using the skills you learn in college, then TSE is the
            perfect place for you! We are all about social good, and we hope you
            share our passion. TSE offers a close network of like-minded
            students, and we can help you build skills that allow you to advance
            your career.
          </p>
        ),
      },
      {
        question: "What is the recruitment process like?",
        answer: (
          <>
            <p>
              TSE recruits new members at the beginning of every Fall quarter.
            </p>
            <p>
              There are three application stages for both designers and
              developers. We start with a resume screen, then a behavioral
              interview (with a few technical questions for aspiring TSE
              developers), followed by a final technical interview. For TEST, we
              have a resume screen, followed by a combined behavioral and
              technical interview.
            </p>
          </>
        ),
      },
      {
        question: "How many project teams are there?",
        answer: (
          <p>
            The number of project teams in TSE depends on the number of
            nonprofits we are able to secure collaborations with every year. We
            usually have around 6 project teams, in addition to the TEST team.
            Each project team consists of an Engineering Manager, a Product
            Manager, a Design Lead, 7-9 developers, and 2-3 designers. Teams
            work independently of one another to create software for the
            nonprofit organization that they have been assigned to.
          </p>
        ),
      },
      {
        question: "How can I stay up-to-date with events?",
        answer: (
          <p>
            We host both internal and public events. Public events may include
            recruitment tabling, info sessions, intern panels, and more. To keep
            up to date with when these take place, follow us on{" "}
            <a
              href="https://www.instagram.com/tse.atucsd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            .
          </p>
        ),
      },
      {
        question: "What do the growth opportunities look like after joining?",
        answer: (
          <p>
            After being a member for a year, you are invited to apply to our
            executive board positions through internal application processes.
            These opportunities include PVP (President and Vice Presidents),
            Engineering Managers, Product Managers, Design Leads, and more.
          </p>
        ),
      },
    ],
  },
  {
    title: "Developer",
    items: [
      {
        question:
          "What computer science knowledge is expected for developer applicants?",
        answer: (
          <>
            <p>
              Here is the knowledge we expect for each grade level. Note that
              your grade level is determined by the year you entered college
              (e.g. if you started college in 2024, graduate in 2027, and are
              applying during the fall 2024 recruitment cycle, then you will be
              evaluated as a freshman). The interview questions might not cover
              all of these topics, and it might be possible to pass the
              interviews without knowing all of these topics, but our interview
              questions are designed with these expectations in mind.
            </p>
            <h4>First-years</h4>
            <p>Approximately CSE 8A or equivalent:</p>
            <ul>
              <li>Familiarity with at least one programming language</li>
              <li>
                Basic datatypes: booleans, integers, floating-point numbers,
                strings, arrays/lists
              </li>
              <li>
                Control flow structures: if/else statements, for/while loops
              </li>
              <li>Functions</li>
              <li>
                Unit testing concepts (no specific frameworks needed) and edge
                cases
              </li>
            </ul>
            <h4>Sophomores/Juniors/Seniors/Transfers</h4>
            <p>Approximately CSE 12 or equivalent:</p>
            <ul>
              <li>All of the topics for first-years, listed above</li>
              <li>Analyzing time and space complexity</li>
              <li>Recursion</li>
              <li>
                Data structures: multidimensional arrays/lists, dynamic arrays,
                stacks, queues, hash tables (also known as hash maps,
                dictionaries)
              </li>
              <li>Algorithms: sorting, binary search</li>
            </ul>
          </>
        ),
      },
      {
        question:
          "How can I prepare for the technical components of the developer recruitment process?",
        answer: (
          <>
            <p>
              In the behavioral interview, expect to do one or more of the
              following:
            </p>
            <ul>
              <li>
                Demonstrate your familiarity with the computer science concepts
                above
              </li>
              <li>Describe how you would test a piece of code</li>
              <li>Write a pseudocode solution to a small programming task</li>
            </ul>
            <p>To prepare for the technical interview:</p>
            <ul>
              <li>
                Brush up on a high-level programming language. Due to the nature
                of the interview tasks, some languages may be more difficult to
                use than others. Python, Java, or JavaScript is preferred. You
                will not be able to compile or run your code, so exact
                syntax/APIs are not that important, but we expect you to
                demonstrate familiarity with the language you choose.
              </li>
              <li>
                Expect to solve one or more programming tasks, which may have
                multiple parts. Be mindful of edge cases, and discuss your
                approach with your interviewer before you start writing code.
              </li>
              <li>
                You will be evaluated on your communication and problem-solving
                skills, the readability, maintainability, and correctness of
                your code, and (for sophomores/juniors/seniors) the algorithmic
                performance of your code.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "What does being a TSE developer look like?",
        answer: (
          <p>
            We emulate the Agile Workflow to give our developers some insight on
            industry standards. Developers complete weekly tasks assigned to
            them by their project manager during their team meetings. The work
            that you will be doing depends on your client. For most web
            development work, we tend to stick to the MERN stack, and for most
            cross-platform mobile development, we focus on using React Native
            with Expo. This means that, as a whole, TSE ends up with many
            JavaScript-based applications. However, depending on the
            client&apos;s needs, we may use other technologies, such as
            TypeScript, Go, and PostgreSQL. Typically, developers spend 4-6
            hours a week on TSE activities.
          </p>
        ),
      },
    ],
  },
  {
    title: "Designer",
    items: [
      {
        question: "What design knowledge is expected for designer applicants?",
        answer: (
          <>
            <p>
              While there is no set amount of experience or coursework we look
              for, we expect more familiarity with product design from juniors
              and seniors than freshmen and sophomores.
            </p>
            <p>
              If you&apos;re a first- or second-year, we look for applications
              that demonstrate evidence of creative problem-solving and
              collaboration in your past projects, as well as genuine curiosity
              about the field. Coursework like DSGN 1 is an example of the kind
              of content that&apos;s useful to know, but having taken the course
              is not a requirement in any way.
            </p>
            <p>
              If you&apos;re a third- or fourth-year, we&apos;re looking for a
              stronger sense of how you approach design work. A portfolio
              demonstrating your end-to-end design process is a great way to
              show us, though not a strict requirement. Courses like COGS 120,
              125, or 127 are examples of content to know, but again, we do not
              screen for specific courses.
            </p>
          </>
        ),
      },
      {
        question: "How can I prepare for the designer technical interview?",
        answer: (
          <>
            <p>
              Be prepared to present a past project you worked on. The
              presentation will be a total of 25 minutes, with 15 minutes of
              presentation and 10 minutes of questions. It is recommended to
              have either slides or some sort of visual component to your
              presentation.
            </p>
            <p>
              In addition, be prepared to solve a design challenge. You will be
              given a prompt similar to an actual TSE project and will have 30
              minutes to demonstrate your ability to think through and solve
              this problem. You should be prepared to both talk through your
              thought process as well as convey your ideas through
              whiteboarding. We want to understand your thinking, so please feel
              free to talk out loud!
            </p>
          </>
        ),
      },
      {
        question: "What does being a TSE designer look like?",
        answer: (
          <p>
            Designers work in teams of 3-4, collaborating closely with
            developers, team leads, and the nonprofit client to understand what
            the nonprofit needs and identify a tailored solution. From there,
            you&apos;ll move through research, ideation, wireframing, and
            prototyping in Figma, handing off to developers along the way and
            staying available as feasibility questions come up. Projects vary in
            scope, from website rebranding to internal software tools, providing
            a dynamic range of challenges. On average, designers dedicate 5-7
            hours per week to TSE activities.
          </p>
        ),
      },
    ],
  },
  {
    title: "Test",
    items: [
      {
        question: "What is the TEST program?",
        answer: (
          <>
            <p>
              The TSE Early Start Training (TEST) program provides students a
              first step into exploring software engineering or UI/UX design. We
              look for students with limited to no prior experience and limited
              access to the resources that build exposure to these fields,
              alongside curiosity, genuine interest, and initiative. The program
              was founded to reach students who might not otherwise find a way
              into tech, and we especially encourage those from underprivileged
              backgrounds to apply.
            </p>
            <p>
              TEST developers and designers will learn the fundamentals of their
              domain while working on beginner-level projects. The program lasts
              for the school year from late Fall through Spring. Afterwards,
              TEST members apply internally to become TSE developers and
              designers.
            </p>
            <p>
              Because the goal is for TEST members to carry what they learn into
              TSE projects the following year, students graduating before Fall
              quarter of the next school year aren&apos;t eligible. You may
              apply to either TSE or the TEST program, not both. If you are
              unsure about which is right for you, please email{" "}
              <a href="mailto:triton.software.engineering@gmail.com">
                triton.software.engineering@gmail.com
              </a>
              .
            </p>
          </>
        ),
      },
      {
        question:
          "What sort of projects will I be working on in the TEST program?",
        answer: (
          <p>
            The projects that TEST developers and designers work on vary every
            year. The topics adapt to each TEST cohort&apos;s preferences as
            well as input from the TEST Design and Developer Lead. Past cohorts,
            for example, have designed and built Fulcrum which is the dashboard
            that helps us manage recruitment today. The goal is that these
            projects will combine all the skills you learn throughout the year
            into something you can be proud of and add to your portfolio.
          </p>
        ),
      },
      {
        question:
          "Can I join TSE as a developer or designer after I complete the TEST program?",
        answer: (
          <p>
            Yes! We have an internal process for transitioning TEST members into
            TSE roles, and our goal is for as many TEST members as possible to
            make that conversion. To be clear, TEST members are already part of
            TSE. You&apos;re a member from day one with access to all that the
            club offers. The difference is the projects you work on, additional
            guidance you receive, and an additional evaluation TEST members can
            choose to undergo at the end of Spring quarter to take on TSE
            project work. This evaluation is just a check that you&apos;re ready
            for more advanced work, not a second application to join TSE.
          </p>
        ),
      },
      {
        question: "What does being a TEST member look like?",
        answer: (
          <p>
            As a TEST member, you will be spending the first portion of the year
            learning content through workshop sessions taught by our TEST Leads
            who have created customized curriculum to help you on your journey.
            You&apos;ll be collaborating with other TEST members during this
            entire process. After this first &quot;bootcamp&quot; period,
            you&apos;ll move onto the project portion of the year where
            you&apos;ll create something awesome using all of the skills you
            picked up. Typically, TEST members spend 4-6 hours a week on TSE
            activities.
          </p>
        ),
      },
    ],
  },
];
