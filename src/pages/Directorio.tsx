import { motion } from "framer-motion";

const Directorio = () => {
  const members = [
    { name: "Carlos Mendoza", role: "Capitán", pace: "4:15/km" },
    { name: "Ana Rodríguez", role: "Co-Capitana", pace: "4:45/km" },
    { name: "Roberto Garza", role: "Coach", pace: "4:30/km" },
    { name: "María Fernanda López", role: "Coordinadora Social", pace: "5:10/km" },
  ];

  return (
    <div className="pt-20 md:pt-24">
      <section className="section-editorial">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="label-sm mb-4 block">Directorio</span>
            <h1 className="headline-xl text-foreground">
              Las caras detrás
              <span className="block text-secondary">de cada kilómetro</span>
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-crema-jersey p-8 flex items-center gap-6"
              >
                <div className="w-20 h-20 bg-gris-calzada/30 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground font-body">{member.role}</p>
                  <span className="stat-display text-sm mt-1 block">
                    {member.pace}
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

export default Directorio;
