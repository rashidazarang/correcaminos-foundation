import { motion } from "framer-motion";

const HallOfFame = () => {
  const achievements = [
    {
      runner: "Carlos Mendoza",
      event: "Maratón de Boston 2024",
      time: "2:58:42",
      highlight: true,
    },
    {
      runner: "Ana Rodríguez",
      event: "Maratón CDMX 2024",
      time: "3:12:15",
      highlight: false,
    },
    {
      runner: "Miguel Ángel Torres",
      event: "Ultra Trail 100K 2024",
      time: "11:45:33",
      highlight: true,
    },
    {
      runner: "Laura Sánchez",
      event: "Medio Maratón Monterrey 2025",
      time: "1:28:05",
      highlight: false,
    },
  ];

  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial bg-negro-asfalto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="label-sm text-gris-humo mb-4 block">Hall of Fame</span>
            <h1 className="headline-xl text-blanco-sal">
              Donde la gloria
              <span className="block text-accent">se escribe en oro</span>
            </h1>
          </motion.div>

          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={`${achievement.runner}-${achievement.event}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 md:p-8 border-l-4 ${
                  achievement.highlight
                    ? "border-accent bg-accent/10"
                    : "border-gris-calzada bg-gris-calzada/20"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-blanco-sal">
                      {achievement.runner}
                    </h3>
                    <p className="text-gris-humo font-body">{achievement.event}</p>
                  </div>
                  <span className="stat-display text-3xl md:text-4xl">
                    {achievement.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HallOfFame;
