import { prisma }
from "../../../lib/prisma";

export async function
generateExecutiveReport() {

  const [

    companies,

    contracts,

    alerts,

  ] = await Promise.all([

    prisma.company.count(),

    prisma.contract.count(),

    prisma.alert.count({

      where: {

        resolved: false,

      },

    }),

  ]);

  return {

    generatedAt:

      new Date(),

    companies,

    contracts,

    openAlerts:

      alerts,

  };

}