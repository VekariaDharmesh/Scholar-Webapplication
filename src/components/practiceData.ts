export interface PracticeQuestion {
  id: string;
  question: string;
  expectedAnswer: string;
  weight: number;
  section: string;
  consensustip: string;
}

export interface SubjectData {
  id: string;
  name: string;
  code: string;
  color: 'amber' | 'navy' | 'green';
  examDate: string;
  mastery: number;
  weakTopics: { name: string; weight: number; status: 'critical' | 'moderate' }[];
  aiInsight: string;
  factClaims: { text: string; consensus: string; status: 'verified' | 'warning' }[];
  concepts: string[];
  relevance: number;
  confidence: number;
  revisionText: string;
  practiceQuestions: PracticeQuestion[];
}

export const initialSubjects: Record<string, SubjectData> = {
  'org-chem': {
    id: 'org-chem',
    name: 'Organic Chemistry',
    code: 'CHEM 301',
    color: 'amber',
    examDate: 'June 12 (15 days)',
    mastery: 68,
    weakTopics: [
      { name: 'Nucleophilic Substitution SN2', weight: 25, status: 'critical' },
      { name: 'Stereochemical Inversion', weight: 15, status: 'moderate' },
      { name: 'Electrophilic Addition', weight: 10, status: 'moderate' }
    ],
    aiInsight: "Focus 80% of your study time on stereocenters and inversion configurations. Past exams from the last 4 years heavily penalize improper drawing of Wedges & Dashes in Section C.",
    factClaims: [
      { text: "SN2 reactions occur with a clean inversion of configuration at the electrophilic carbon.", consensus: "Verified by 14 authorized textbooks", status: 'verified' },
      { text: "Protic solvents increase SN2 reaction velocity by stabilizing carbocations.", consensus: "Contradicts standard syllabus key (Polar, aprotic solvents required)", status: 'warning' }
    ],
    concepts: ['Chiral Carbons', 'Leaving Groups', 'Aprotic Solvents', 'Activation Energy', 'Transition States'],
    relevance: 94,
    confidence: 88,
    revisionText: "Perform SN2 kinetic practice sets, specifically targeting transition states with polar, aprotic solvent variables.",
    practiceQuestions: [
      {
        id: 'chem-q1',
        question: "Draw the transition state for the reaction of (R)-2-bromobutane with sodium hydroxide. Explain the stereochemical configuration of the resulting product.",
        expectedAnswer: "The reaction proceeds via an SN2 mechanism. Draw a pentacoordinate transition state carbon showing partial dashed bonds to the incoming nucleophile (OH-) and the outgoing leaving group (Br-). The resulting product must be (S)-2-butanol due to Walden backside nucleophilic attack, resulting in 100% inversion of the chiral center.",
        weight: 15,
        section: "Section C • Free Response",
        consensustip: "Textbooks warn that failure to draw partial dashed bonds and partial charges (δ-, δ-) on both OH and Br in the transition state is the top reason students lose partial credit on this specific college key."
      },
      {
        id: 'chem-q2',
        question: "Compare the reaction velocity of methyl bromide with hydroxide ion in methanol versus dimethyl sulfoxide (DMSO).",
        expectedAnswer: "Hydroxide ion is a strong nucleophile. Methanol is a protic solvent which solvates the hydroxide ion via hydrogen bonding, creating a cage and decreasing its ground state energy (nucleophilicity). DMSO is an aprotic solvent; it does not solvate anions strongly, leaving the hydroxide ion highly reactive. The reaction will proceed approximately 10^5 times faster in DMSO.",
        weight: 10,
        section: "Section B • Short Answer",
        consensustip: "Grade keys explicitly look for the terms 'anion solvation' or 'hydrogen-bonding cage' when explaining protic solvent rate retardation."
      },
      {
        id: 'chem-q3',
        question: "Detail the major product and mechanistic pathway when 2-chloro-2-methylpropane is reacted with ethanol at elevated temperatures. How does solvent choice impact this compared to SN2?",
        expectedAnswer: "This reaction proceeds via an SN1 mechanism (with E1 elimination as a minor pathway) because the substrate is a tertiary alkyl halide, which cannot undergo SN2 due to extreme steric hindrance. Ethanol acts as a weak nucleophile and a protic solvent. It stabilizes the forming carbocation intermediate via polar solvation. The major substitution product is 2-ethoxy-2-methylpropane (ethyl tert-butyl ether).",
        weight: 12,
        section: "Section B • Substitution Pathways",
        consensustip: "Exams frequently penalize students who draw a pentacoordinate transition state for tertiary carbon halides. Ensure you explicitly draw the planar carbocation intermediate first to secure maximum points."
      },
      {
        id: 'chem-q4',
        question: "Explain how the choice of leaving group affects the rate of an SN2 reaction. Arrange the following in order of increasing reactivity: fluoroethane, iodoethane, bromoethane, chloroethane.",
        expectedAnswer: "The rate of SN2 reactions depends heavily on the leaving group's ability to stabilize negative charge after departure. The weaker the conjugate base, the more stable it is, making it a better leaving group. Thus, iodide (I-) is the best leaving group and fluoride (F-) is the poorest. The reactivity order is: fluoroethane < chloroethane < bromoethane < iodoethane.",
        weight: 10,
        section: "Section A • Comparative Kinetics",
        consensustip: "Grading keys explicitly look for the correlation between leaving group ability and conjugate base strength/pKa of the halogen acids (HI, HBr, HCl, HF)."
      }
    ]
  },
  'quant-phys': {
    id: 'quant-phys',
    name: 'Quantum Physics',
    code: 'PHYS 401',
    color: 'navy',
    examDate: 'June 18 (21 days)',
    mastery: 42,
    weakTopics: [
      { name: 'Schrödinger Time-Dependent', weight: 35, status: 'critical' },
      { name: 'Infinite Square Wells', weight: 20, status: 'critical' },
      { name: 'Hermitian Operators', weight: 15, status: 'moderate' }
    ],
    aiInsight: "Infinite square well solutions account for 35% of all calculus-based questions. Make sure you memorize boundary conditions as zero-probability endpoints.",
    factClaims: [
      { text: "The wavefunction must always be continuous and normalized over all space.", consensus: "Verified by 18 authorized textbook keys", status: 'verified' },
      { text: "Probability density can exceed 1.0 inside highly deep potential barriers.", consensus: "Physical impossibility (Violates standard normalization postulates)", status: 'warning' }
    ],
    concepts: ['Wavefunction Normalization', 'Boundary Conditions', 'Eigenstates', 'Probability Density', 'Dirac Notation'],
    relevance: 98,
    confidence: 96,
    revisionText: "Derive time-independent Schrödinger formulations inside infinite barriers, focusing on boundary integrations.",
    practiceQuestions: [
      {
        id: 'phys-q1',
        question: "Solve the time-independent Schrödinger equation for a particle of mass m in an infinite potential well of width L. Derive the normalized wavefunctions and allowed energy levels.",
        expectedAnswer: "Inside the well (0 < x < L), V(x) = 0, so - (hbar^2 / 2m) * (d^2 psi / dx^2) = E * psi. General solution is psi(x) = A sin(kx) + B cos(kx). Boundary conditions psi(0) = 0 implies B = 0. psi(L) = 0 implies kL = n * pi, so k = n * pi / L. Normalizing over the well yields A = sqrt(2/L). Normalized Wavefunctions: psi_n(x) = sqrt(2/L) * sin(n * pi * x / L). Allowed Energy Levels: E_n = (n^2 * pi^2 * hbar^2) / (2m * L^2).",
        weight: 20,
        section: "Section C • Mathematical Derivation",
        consensustip: "Calculus grading outlines note that failing to state that 'n' must be a positive non-zero integer (n = 1, 2, 3...) is a common deduction since n=0 represents a zero-probability trivial wavefunction."
      },
      {
        id: 'phys-q2',
        question: "Explain why Hermitian operators are chosen to represent physical observables in quantum mechanics. State the mathematical definition.",
        expectedAnswer: "Physical observables must yield real measurement values. Hermitian operators have eigenvalues that are mathematically guaranteed to be entirely real, and their eigenstates form a complete orthonormal basis. Mathematical definition: <f | Ag> = <Af | g> for all states f, g in the Hilbert space.",
        weight: 15,
        section: "Section B • Conceptual Review",
        consensustip: "Your instructor strictly grades on the Dirac bra-ket formulation for the Hermiticity definition. Avoid writing standard integral forms unless explicitly prompted."
      },
      {
        id: 'phys-q3',
        question: "Explain the physical significance of the Heisenberg Uncertainty Principle. Derive the uncertainty relation between position and momentum using wavepacket standard deviations.",
        expectedAnswer: "The Heisenberg Uncertainty Principle states that position and momentum cannot be simultaneously measured to arbitrary precision. It is a fundamental property of wave-like systems. Mathematically, Delta x * Delta p >= hbar/2, where Delta x and Delta p are the standard deviations of position and momentum distributions. This arises from the Fourier transform relation between the spatial wavefunction and momentum wavefunction (k-space).",
        weight: 15,
        section: "Section C • Wavepacket Mechanics",
        consensustip: "Professors frequently deduct points if students state the uncertainty is due to measurement device limitations. It is an intrinsic mathematical property of wave mechanics, not a technological limit."
      },
      {
        id: 'phys-q4',
        question: "Define the concept of expectation value in quantum mechanics. Write the equation to calculate the expectation value of position <x> for a particle described by wavefunction psi(x).",
        expectedAnswer: "The expectation value represents the average value of a series of measurements performed on an ensemble of identically prepared quantum states. Equation: <x> = integral from -infinity to +infinity of (psi*(x) * x * psi(x) dx).",
        weight: 10,
        section: "Section B • Operator Mathematics",
        consensustip: "Remember to emphasize that the wavefunction must be normalized. If psi(x) is not normalized, the integral must be divided by integral(psi*(x) * psi(x) dx) to yield the correct expectation value."
      }
    ]
  },
  'neurobio': {
    id: 'neurobio',
    name: 'Cognitive Neurobiology',
    code: 'NEUR 350',
    color: 'green',
    examDate: 'June 22 (25 days)',
    mastery: 81,
    weakTopics: [
      { name: 'Synaptic Plasticity & LTP', weight: 20, status: 'moderate' },
      { name: 'Retrograde Transmitters', weight: 12, status: 'moderate' },
      { name: 'AMPA/NMDA Co-activation', weight: 8, status: 'moderate' }
    ],
    aiInsight: "NMDA channel magnesium blocks are high-yield questions. Practice drawing the voltage-dependent block clearance mechanics for short-answer questions.",
    factClaims: [
      { text: "NMDA receptors require both glutamate binding and depolarization to open.", consensus: "Verified by 22 molecular biology texts", status: 'verified' },
      { text: "Magnesium ions block NMDA channels permanently in standard cellular rest.", consensus: "Disputed (Block clears rapidly upon strong membrane depolarization)", status: 'warning' }
    ],
    concepts: ['Long-Term Potentiation', 'NMDA Receptor Block', 'Hebbian Learning', 'Retrograde Signaling', 'Spine Density'],
    relevance: 87,
    confidence: 91,
    revisionText: "Sketch out the calcium influx pathway resulting from magnesium expulsion in NMDA channels during LTP.",
    practiceQuestions: [
      {
        id: 'neur-q1',
        question: "Detail the molecular cascade that clears the magnesium ion block from NMDA receptors during the induction of Long-Term Potentiation (LTP).",
        expectedAnswer: "At resting membrane potential (-70mV), NMDA receptor channels are blocked by extracellular Mg2+ ions. Strong pre-synaptic stimulation releases glutamate, which binds and opens AMPA receptors, causing depolarizing Na+ influx. When the post-synaptic membrane depolarizes to approximately -30mV, the positive charge expels the Mg2+ ion from the NMDA channel pore. This allows Ca2+ ions to enter, triggering downstream kinases (CaMKII) to induce LTP.",
        weight: 15,
        section: "Section C • Mechanism Study",
        consensustip: "Syllabus keys note that magnesium clearance is strictly voltage-dependent, not ligand-dependent. The block clears only upon depolarization, even if glutamate is already bound."
      },
      {
        id: 'neur-q2',
        question: "Explain the role of retrograde messengers in synaptic plasticity and identify one major class of retrograde transmitters.",
        expectedAnswer: "Retrograde messengers travel backwards across the synaptic cleft from the post-synaptic dendritic spine to the pre-synaptic axon terminal, triggering increased pre-synaptic glutamate release probability. The primary class is Nitric Oxide (NO) or endocannabinoids, synthesized on-demand in the post-synaptic cell in response to calcium influx.",
        weight: 10,
        section: "Section B • Short Answer",
        consensustip: "Syllabus outlines expect explicit mention of 'on-demand synthesis' and 'retrograde travel' to qualify for full credit."
      },
      {
        id: 'neur-q3',
        question: "Explain the phenomenon of Long-Term Depression (LTD) in the cerebellum and compare it with the induction of LTP in the hippocampus.",
        expectedAnswer: "Cerebellar LTD is induced by low-frequency stimulation and leads to a decrease in synaptic strength. It involves the activation of metabotropic glutamate receptors (mGluR1) and moderate calcium influx, leading to the internalization of AMPA receptors. Hippocampal LTP involves high-frequency stimulation, large calcium influx via NMDA receptors, and insertion of AMPA receptors.",
        weight: 15,
        section: "Section C • Synaptic Plasticity",
        consensustip: "Make sure to contrast the calcium threshold hypothesis: high calcium spikes trigger kinases and LTP, whereas prolonged low calcium levels activate phosphatases and trigger LTD."
      },
      {
        id: 'neur-q4',
        question: "State the classic definition of Hebbian Learning. How does Hebb's rule map to the physical properties of NMDA receptors?",
        expectedAnswer: "Hebbian learning is summarized as 'cells that fire together, wire together'. When a presynaptic cell repeatedly or persistently takes part in firing a postsynaptic cell, some growth process or metabolic change takes place that increases the presynaptic cell's efficiency. The NMDA receptor acts as a physical 'coincidence detector' because it requires both presynaptic glutamate release and postsynaptic depolarization to clear its magnesium block.",
        weight: 12,
        section: "Section B • Conceptual Synaptic Theory",
        consensustip: "Exams expect students to define the NMDA receptor specifically as a 'coincidence detector' that physically embodies Hebb's postulate by requiring dual pre- and post-synaptic activation."
      }
    ]
  }
};
