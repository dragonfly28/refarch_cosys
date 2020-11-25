/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2020
 */
package de.muenchen.refarch.cosys.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import de.muenchen.refarch.cosys.MicroServiceApplication;
import de.muenchen.refarch.cosys.domain.TheEntity;

import static de.muenchen.refarch.cosys.TestConstants.SPRING_TEST_PROFILE;
import static de.muenchen.refarch.cosys.TestConstants.SPRING_NO_SECURITY_PROFILE;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;


@RunWith(SpringRunner.class)
@SpringBootTest(
        classes = {MicroServiceApplication.class},
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = {"spring.datasource.url=jdbc:h2:mem:cosys_prototype;DB_CLOSE_ON_EXIT=FALSE",
                "tomcat.gracefulshutdown.pre-wait-seconds=0"})
@ActiveProfiles(profiles = {SPRING_TEST_PROFILE, SPRING_NO_SECURITY_PROFILE})
public class TheEntityRepositoryTest {

    @Autowired
    private TheEntityRepository repository;

    @Test
    @Transactional(propagation=Propagation.REQUIRED, readOnly=false, noRollbackFor=Exception.class)
    public void testSave(){

        // Implement your logic here by replacing and/or extending the code

        // initialize
        TheEntity original = new TheEntity();
        original.setTextAttribute("test");

        // persist
        original = repository.save(original);

        // check
        TheEntity persisted = repository.findById(original.getId()).orElse(null);
        assertNotNull(persisted);
        assertEquals(original, persisted);

    }

}
