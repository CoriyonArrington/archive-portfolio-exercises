// components/common/design-process.tsx
interface DesignProcessProps {
  processPhases: {
    phase_title: string;
    description: string;
  }[];
}

const DesignProcess = ({ processPhases }: DesignProcessProps) => {
  return (
    <div className="space-y-6">
      {processPhases.map((phase, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{phase.phase_title}</h3> {/* Display phase title */}
          <p>{phase.description}</p> {/* Display phase description */}
        </div>
      ))}
    </div>
  );
};

export default DesignProcess;
